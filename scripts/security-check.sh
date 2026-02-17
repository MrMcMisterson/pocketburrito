#!/bin/bash
#
# security-check.sh — Quick security health check for PocketBurrito server
#
# Run periodically or via cron to verify security posture.
# Usage: bash security-check.sh
#

PASS="\033[32mPASS\033[0m"
FAIL="\033[31mFAIL\033[0m"
WARN="\033[33mWARN\033[0m"

echo "======================================="
echo "  PocketBurrito Security Health Check"
echo "  $(date)"
echo "======================================="
echo ""

ISSUES=0

# Check 1: Root SSH login
if grep -q "^PermitRootLogin no" /etc/ssh/sshd_config 2>/dev/null; then
    echo -e "[$PASS] Root SSH login disabled"
else
    echo -e "[$FAIL] Root SSH login is enabled"
    ISSUES=$((ISSUES + 1))
fi

# Check 2: Password auth disabled
if grep -q "^PasswordAuthentication no" /etc/ssh/sshd_config 2>/dev/null; then
    echo -e "[$PASS] SSH password authentication disabled"
else
    echo -e "[$FAIL] SSH password authentication is enabled"
    ISSUES=$((ISSUES + 1))
fi

# Check 3: APP_DEBUG
if grep -q "APP_DEBUG=false" /var/www/paymenter/paymenter/.env 2>/dev/null; then
    echo -e "[$PASS] Paymenter APP_DEBUG=false"
else
    echo -e "[$FAIL] Paymenter APP_DEBUG is not false"
    ISSUES=$((ISSUES + 1))
fi

if grep -q "APP_DEBUG=false" /var/www/pterodactyl/.env 2>/dev/null; then
    echo -e "[$PASS] Pterodactyl APP_DEBUG=false"
else
    echo -e "[$FAIL] Pterodactyl APP_DEBUG is not false"
    ISSUES=$((ISSUES + 1))
fi

# Check 4: .env permissions
PAYMENTER_PERMS=$(stat -c "%a" /var/www/paymenter/paymenter/.env 2>/dev/null)
if [ "$PAYMENTER_PERMS" = "600" ]; then
    echo -e "[$PASS] Paymenter .env permissions: 600"
else
    echo -e "[$FAIL] Paymenter .env permissions: $PAYMENTER_PERMS (should be 600)"
    ISSUES=$((ISSUES + 1))
fi

PTERODACTYL_PERMS=$(stat -c "%a" /var/www/pterodactyl/.env 2>/dev/null)
if [ "$PTERODACTYL_PERMS" = "600" ]; then
    echo -e "[$PASS] Pterodactyl .env permissions: 600"
else
    echo -e "[$FAIL] Pterodactyl .env permissions: $PTERODACTYL_PERMS (should be 600)"
    ISSUES=$((ISSUES + 1))
fi

# Check 5: UFW active
if sudo ufw status 2>/dev/null | grep -q "Status: active"; then
    echo -e "[$PASS] UFW firewall is active"
else
    echo -e "[$FAIL] UFW firewall is NOT active"
    ISSUES=$((ISSUES + 1))
fi

# Check 6: fail2ban running
if systemctl is-active --quiet fail2ban; then
    echo -e "[$PASS] fail2ban is running"
else
    echo -e "[$FAIL] fail2ban is NOT running"
    ISSUES=$((ISSUES + 1))
fi

# Check 7: MySQL localhost only
if sudo ss -tlnp | grep 3306 | grep -q "127.0.0.1"; then
    echo -e "[$PASS] MySQL listening on localhost only"
else
    echo -e "[$FAIL] MySQL may be externally accessible"
    ISSUES=$((ISSUES + 1))
fi

# Check 8: SSL certificates valid
for DOMAIN in billing.pocketburrito.ca panel.pocketburrito.ca; do
    EXPIRY=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
    if [ -n "$EXPIRY" ]; then
        EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s 2>/dev/null)
        NOW_EPOCH=$(date +%s)
        DAYS_LEFT=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))
        if [ "$DAYS_LEFT" -gt 14 ]; then
            echo -e "[$PASS] SSL cert for $DOMAIN valid ($DAYS_LEFT days left)"
        else
            echo -e "[$WARN] SSL cert for $DOMAIN expiring soon ($DAYS_LEFT days left)"
            ISSUES=$((ISSUES + 1))
        fi
    else
        echo -e "[$WARN] Could not check SSL for $DOMAIN"
    fi
done

# Check 9: Nginx running
if systemctl is-active --quiet nginx; then
    echo -e "[$PASS] Nginx is running"
else
    echo -e "[$FAIL] Nginx is NOT running"
    ISSUES=$((ISSUES + 1))
fi

# Check 10: PHP-FPM running
if systemctl is-active --quiet php8.3-fpm; then
    echo -e "[$PASS] PHP-FPM is running"
else
    echo -e "[$FAIL] PHP-FPM is NOT running"
    ISSUES=$((ISSUES + 1))
fi

# Check 11: Disk space
DISK_USAGE=$(df / --output=pcent | tail -1 | tr -d ' %')
if [ "$DISK_USAGE" -lt 80 ]; then
    echo -e "[$PASS] Disk usage: ${DISK_USAGE}%"
elif [ "$DISK_USAGE" -lt 90 ]; then
    echo -e "[$WARN] Disk usage: ${DISK_USAGE}% (getting high)"
    ISSUES=$((ISSUES + 1))
else
    echo -e "[$FAIL] Disk usage: ${DISK_USAGE}% (critical)"
    ISSUES=$((ISSUES + 1))
fi

echo ""
echo "======================================="
if [ "$ISSUES" -eq 0 ]; then
    echo -e "  All checks passed!"
else
    echo -e "  $ISSUES issue(s) found"
fi
echo "======================================="
