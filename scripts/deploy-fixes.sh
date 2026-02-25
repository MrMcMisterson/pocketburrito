#!/bin/bash
# Deploy fixes for services/tickets crashes + nav updates
# Run on server: bash /tmp/deploy-fixes.sh

set -e

# Read sudo password from environment or prompt
if [ -z "$SUDO_PASS" ]; then
    read -s -p "Enter sudo password: " SUDO_PASS
    echo
fi

echo "=== Step 1: Clean up orphaned services (product_id IS NULL) ==="
echo "$SUDO_PASS" | sudo -S mysql -u root paymenter -e "SELECT id, product_id, status FROM services WHERE product_id IS NULL;" 2>/dev/null
echo "$SUDO_PASS" | sudo -S mysql -u root paymenter -e "DELETE FROM services WHERE product_id IS NULL;" 2>/dev/null
echo "Orphaned services deleted."

echo ""
echo "=== Step 2: Deploy theme files ==="
THEME_DIR="/var/www/paymenter/paymenter/themes/pocketburrito"

# Copy navigation (already exists, overwrite)
echo "$SUDO_PASS" | sudo -S cp /tmp/theme-deploy/navigation-index.blade.php "$THEME_DIR/views/components/navigation/index.blade.php" 2>/dev/null

# Create services directory if needed and copy
echo "$SUDO_PASS" | sudo -S mkdir -p "$THEME_DIR/views/services" 2>/dev/null
echo "$SUDO_PASS" | sudo -S cp /tmp/theme-deploy/services-index.blade.php "$THEME_DIR/views/services/index.blade.php" 2>/dev/null

# Create tickets directory if needed and copy
echo "$SUDO_PASS" | sudo -S mkdir -p "$THEME_DIR/views/tickets" 2>/dev/null
echo "$SUDO_PASS" | sudo -S cp /tmp/theme-deploy/tickets-create.blade.php "$THEME_DIR/views/tickets/create.blade.php" 2>/dev/null

# Fix ownership
echo "$SUDO_PASS" | sudo -S chown -R www-data:www-data "$THEME_DIR" 2>/dev/null
echo "Theme files deployed."

echo ""
echo "=== Step 3: Clear caches ==="
cd /var/www/paymenter/paymenter
echo "$SUDO_PASS" | sudo -S php artisan view:clear 2>/dev/null
echo "$SUDO_PASS" | sudo -S php artisan optimize:clear 2>/dev/null
echo "Caches cleared."

echo ""
echo "=== Step 4: Restart PHP-FPM ==="
echo "$SUDO_PASS" | sudo -S systemctl restart php8.2-fpm 2>/dev/null || echo "$SUDO_PASS" | sudo -S systemctl restart php8.3-fpm 2>/dev/null || echo "Could not restart PHP-FPM (check version)"
echo "PHP-FPM restarted."

echo ""
echo "=== Done! ==="
echo "Verify:"
echo "  1. https://billing.pocketburrito.ca/services"
echo "  2. https://billing.pocketburrito.ca/tickets/create"
echo "  3. Check nav dropdown for Services link"
