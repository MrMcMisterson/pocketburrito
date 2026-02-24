#!/bin/bash
# PocketBurrito Backup Script
# Run nightly via cron: 0 3 * * * /home/rpuderak/backup.sh
#
# Setup:
#   1. SCP this to server: scp scripts/backup.sh rpuderak@5.78.100.72:/home/rpuderak/backup.sh
#   2. Fix line endings: ssh rpuderak@5.78.100.72 "sed -i 's/\r$//' /home/rpuderak/backup.sh"
#   3. Make executable: ssh rpuderak@5.78.100.72 "chmod +x /home/rpuderak/backup.sh"
#   4. Add to crontab: ssh rpuderak@5.78.100.72 "crontab -l 2>/dev/null; echo '0 3 * * * /home/rpuderak/backup.sh >> /var/log/pocketburrito-backup.log 2>&1'" | crontab -
#   5. Create backup directory: sudo mkdir -p /backups && sudo chown rpuderak:rpuderak /backups

set -euo pipefail

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETAIN_DAYS=30
# Read sudo password from environment variable
# Set via: export SUDO_PASS="your-password" or in crontab environment
if [ -z "${SUDO_PASS:-}" ]; then
    echo "ERROR: SUDO_PASS environment variable not set" >&2
    exit 1
fi

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "Starting PocketBurrito backup..."

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# --- Database Backups ---
log "Backing up Paymenter database..."
echo "$SUDO_PASS" | sudo -S mysqldump -u root paymenter 2>/dev/null | gzip > "$BACKUP_DIR/paymenter-db-$DATE.sql.gz"

log "Backing up Pterodactyl database..."
echo "$SUDO_PASS" | sudo -S mysqldump -u root panel 2>/dev/null | gzip > "$BACKUP_DIR/panel-db-$DATE.sql.gz"

# --- Config File Backups ---
log "Backing up configuration files..."
mkdir -p "$BACKUP_DIR/configs-$DATE"

echo "$SUDO_PASS" | sudo -S cp /var/www/paymenter/paymenter/.env "$BACKUP_DIR/configs-$DATE/paymenter.env" 2>/dev/null
echo "$SUDO_PASS" | sudo -S cp /var/www/pterodactyl/.env "$BACKUP_DIR/configs-$DATE/pterodactyl.env" 2>/dev/null
echo "$SUDO_PASS" | sudo -S cp /etc/nginx/sites-enabled/paymenter.conf "$BACKUP_DIR/configs-$DATE/paymenter-nginx.conf" 2>/dev/null
echo "$SUDO_PASS" | sudo -S cp /etc/nginx/sites-enabled/pterodactyl.conf "$BACKUP_DIR/configs-$DATE/pterodactyl-nginx.conf" 2>/dev/null

# Compress configs
tar -czf "$BACKUP_DIR/configs-$DATE.tar.gz" -C "$BACKUP_DIR" "configs-$DATE" 2>/dev/null
rm -rf "$BACKUP_DIR/configs-$DATE"

# --- Paymenter Uploads Backup ---
log "Backing up Paymenter uploads..."
echo "$SUDO_PASS" | sudo -S tar -czf "$BACKUP_DIR/paymenter-uploads-$DATE.tar.gz" -C /var/www/paymenter/paymenter storage/app/public 2>/dev/null || log "Warning: Paymenter uploads backup failed (may be empty)"

# --- Cleanup Old Backups ---
log "Cleaning up backups older than $RETAIN_DAYS days..."
find "$BACKUP_DIR" -type f -name "*.gz" -mtime +$RETAIN_DAYS -delete 2>/dev/null || true
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +$RETAIN_DAYS -delete 2>/dev/null || true

# --- Report ---
BACKUP_SIZE=$(du -sh "$BACKUP_DIR" 2>/dev/null | cut -f1)
log "Backup complete. Total backup directory size: $BACKUP_SIZE"
log "Files created:"
ls -la "$BACKUP_DIR"/*$DATE* 2>/dev/null || log "Warning: No files found for today"

log "Done."
