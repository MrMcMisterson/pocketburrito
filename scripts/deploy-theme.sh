#!/bin/bash
#
# deploy-theme.sh — Deploy pocketburrito Paymenter theme to production
#
# Usage:   ./deploy-theme.sh [path-to-theme-dir]
# Default: Uses ~/pb-theme/ if no argument given
#
# This script:
#   1. SCPs theme files to the server's /tmp/
#   2. Copies them into the Paymenter theme directory
#   3. Rebuilds theme assets (npm run build)
#   4. Clears all Laravel/Paymenter caches
#   5. Restarts PHP-FPM
#

set -euo pipefail

# Configuration
SERVER_USER="rpuderak"
SERVER_IP="5.78.100.72"
REMOTE_THEME_DIR="/var/www/paymenter/paymenter/themes/pocketburrito"
PAYMENTER_DIR="/var/www/paymenter/paymenter"
REMOTE_TMP="/tmp/pb-theme-deploy"
PW_FILE="/tmp/pw.txt"

# Theme source directory
THEME_DIR="${1:-$HOME/pb-theme}"

if [ ! -d "$THEME_DIR" ]; then
    echo "ERROR: Theme directory not found: $THEME_DIR"
    exit 1
fi

echo "=== PocketBurrito Theme Deployment ==="
echo "Source: $THEME_DIR"
echo "Target: $SERVER_USER@$SERVER_IP:$REMOTE_THEME_DIR"
echo ""

# Step 1: Upload theme files to /tmp/ on server
echo "[1/5] Uploading theme files..."
ssh "$SERVER_USER@$SERVER_IP" "rm -rf $REMOTE_TMP && mkdir -p $REMOTE_TMP"
scp -r "$THEME_DIR/"* "$SERVER_USER@$SERVER_IP:$REMOTE_TMP/"
echo "      Done."

# Step 2: Copy files into theme directory (requires sudo)
echo "[2/5] Installing theme files..."
ssh "$SERVER_USER@$SERVER_IP" "cat $PW_FILE | sudo -S bash -c '
    cp -r $REMOTE_TMP/* $REMOTE_THEME_DIR/
    chown -R www-data:www-data $REMOTE_THEME_DIR/
' 2>/dev/null"
echo "      Done."

# Step 3: Rebuild theme assets
echo "[3/5] Building theme assets..."
ssh "$SERVER_USER@$SERVER_IP" "cat $PW_FILE | sudo -S bash -c '
    cd $PAYMENTER_DIR && npm run build pocketburrito
' 2>/dev/null"
echo "      Done."

# Step 4: Clear caches
echo "[4/5] Clearing caches..."
ssh "$SERVER_USER@$SERVER_IP" "cat $PW_FILE | sudo -S bash -c '
    cd $PAYMENTER_DIR
    php artisan optimize:clear
    php artisan view:clear
    php artisan config:clear
' 2>/dev/null"
echo "      Done."

# Step 5: Restart PHP-FPM
echo "[5/5] Restarting PHP-FPM..."
ssh "$SERVER_USER@$SERVER_IP" "cat $PW_FILE | sudo -S systemctl restart php8.3-fpm 2>/dev/null"
echo "      Done."

# Cleanup
ssh "$SERVER_USER@$SERVER_IP" "rm -rf $REMOTE_TMP"

echo ""
echo "=== Deployment complete ==="
