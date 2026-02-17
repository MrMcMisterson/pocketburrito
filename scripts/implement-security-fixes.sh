#!/bin/bash
#
# implement-security-fixes.sh — PocketBurrito Security Fixes
#
# WARNING: Review each section before running. Do NOT execute blindly.
# Run individual sections by uncommenting them.
#
# Date: 2026-02-17
# Server: 5.78.100.72
#

set -euo pipefail

echo "============================================"
echo "  PocketBurrito Security Fixes"
echo "  Review each section before executing!"
echo "============================================"

# =============================================
# CRITICAL FIX 1: Disable root SSH login
# =============================================
echo ""
echo "[CRITICAL] Fix 1: Disable root SSH login"
echo "  Current: PermitRootLogin yes"
echo "  Change to: PermitRootLogin no"
echo ""
# Uncomment to apply:
# sudo sed -i 's/^PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config
# sudo systemctl restart sshd
# echo "  DONE: Root SSH login disabled"

# =============================================
# CRITICAL FIX 2: Disable Paymenter APP_DEBUG
# =============================================
echo "[CRITICAL] Fix 2: Set Paymenter APP_DEBUG=false"
echo "  Current: APP_DEBUG=true"
echo ""
# Uncomment to apply:
# sudo sed -i 's/^APP_DEBUG=true/APP_DEBUG=false/' /var/www/paymenter/paymenter/.env
# cd /var/www/paymenter/paymenter && sudo -u www-data php artisan config:clear
# echo "  DONE: APP_DEBUG set to false"

# =============================================
# HIGH FIX 3: Secure .env file permissions
# =============================================
echo "[HIGH] Fix 3: Set .env permissions to 600"
echo "  Current: 755 (world-readable)"
echo ""
# Uncomment to apply:
# sudo chmod 600 /var/www/paymenter/paymenter/.env
# sudo chmod 600 /var/www/pterodactyl/.env
# echo "  DONE: .env files secured"

# =============================================
# HIGH FIX 4: Disable server_tokens
# =============================================
echo "[HIGH] Fix 4: Disable nginx server_tokens"
echo "  Current: commented out"
echo ""
# Uncomment to apply:
# sudo sed -i 's/# server_tokens off;/server_tokens off;/' /etc/nginx/nginx.conf
# sudo nginx -t && sudo systemctl reload nginx
# echo "  DONE: server_tokens disabled"

# =============================================
# MEDIUM FIX 5: Disable expose_php
# =============================================
echo "[MEDIUM] Fix 5: Disable expose_php"
echo ""
# Uncomment to apply:
# sudo sed -i 's/^expose_php = On/expose_php = Off/' /etc/php/8.3/fpm/php.ini
# sudo systemctl restart php8.3-fpm
# echo "  DONE: expose_php disabled"

# =============================================
# MEDIUM FIX 6: Add security headers to Pterodactyl nginx config
# =============================================
echo "[MEDIUM] Fix 6: Add security headers to Pterodactyl"
echo ""
# Uncomment to apply:
# sudo sed -i '/charset utf-8;/a\
#     add_header X-Frame-Options "SAMEORIGIN";\
#     add_header X-Content-Type-Options "nosniff";\
#     add_header Referrer-Policy "strict-origin-when-cross-origin";' /etc/nginx/sites-enabled/pterodactyl.conf
# sudo nginx -t && sudo systemctl reload nginx
# echo "  DONE: Security headers added to Pterodactyl"

# =============================================
# MEDIUM FIX 7: Remove unused port 8080 from UFW
# =============================================
echo "[MEDIUM] Fix 7: Remove port 8080 from UFW (if not needed)"
echo ""
# Uncomment to apply:
# sudo ufw delete allow 8080/tcp
# echo "  DONE: Port 8080 removed from UFW"

# =============================================
# MEDIUM FIX 8: Apply system updates
# =============================================
echo "[MEDIUM] Fix 8: Apply pending system updates"
echo ""
# Uncomment to apply:
# sudo apt update && sudo apt upgrade -y
# sudo systemctl restart php8.3-fpm
# echo "  DONE: System updated"

# =============================================
# LOW FIX 9: Add HSTS headers
# =============================================
echo "[LOW] Fix 9: Add HSTS headers to nginx configs"
echo ""
# Uncomment to apply:
# sudo sed -i '/add_header X-Frame-Options/a\    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;' /etc/nginx/sites-enabled/paymenter.conf
# sudo nginx -t && sudo systemctl reload nginx
# echo "  DONE: HSTS headers added"

echo ""
echo "============================================"
echo "  Review complete. Uncomment fixes to apply."
echo "============================================"
