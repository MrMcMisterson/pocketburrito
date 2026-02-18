# PocketBurrito Deployment Guide

## Frontend (pocketburrito.ca)

The Astro site is deployed to Cloudflare Pages. Pushing to `main` triggers an automatic build and deploy.

```bash
git add .
git commit -m "description"
git push origin main
# Cloudflare Pages auto-builds and deploys in ~2 minutes
```

**Cloudflare Pages settings:**
- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `/`

## Paymenter Theme (billing.pocketburrito.ca)

The custom Paymenter theme is in `themes/pocketburrito/`. To deploy changes:

### Option 1: Deployment script (recommended)
```bash
ssh rpuderak@5.78.100.72 "bash /home/rpuderak/deploy-theme.sh"
```

### Option 2: Manual deploy
```bash
# Copy specific files
scp themes/pocketburrito/views/FILE.blade.php rpuderak@5.78.100.72:/tmp/

# SSH in and move with sudo
ssh rpuderak@5.78.100.72
echo 'REDACTED_PASSWORD' | sudo -S cp /tmp/FILE.blade.php /var/www/paymenter/paymenter/themes/pocketburrito/views/FILE.blade.php
echo 'REDACTED_PASSWORD' | sudo -S chown www-data:www-data /var/www/paymenter/paymenter/themes/pocketburrito/views/FILE.blade.php
echo 'REDACTED_PASSWORD' | sudo -S php /var/www/paymenter/paymenter/artisan view:clear
```

## Server Configuration

### Nginx configs
- Paymenter: `/etc/nginx/sites-enabled/paymenter.conf` (includes redirect rules)
- Pterodactyl: `/etc/nginx/sites-enabled/pterodactyl.conf`

After Nginx changes:
```bash
echo 'REDACTED_PASSWORD' | sudo -S nginx -t && echo 'REDACTED_PASSWORD' | sudo -S systemctl reload nginx
```

### Paymenter maintenance
```bash
# Clear caches
echo 'REDACTED_PASSWORD' | sudo -S php /var/www/paymenter/paymenter/artisan config:clear
echo 'REDACTED_PASSWORD' | sudo -S php /var/www/paymenter/paymenter/artisan cache:clear
echo 'REDACTED_PASSWORD' | sudo -S php /var/www/paymenter/paymenter/artisan view:clear
```

### Database queries
```bash
echo 'REDACTED_PASSWORD' | sudo -S mysql -u root paymenter -e "SELECT * FROM products LIMIT 5;" 2>/dev/null
```

## Adding a New Game

1. **Astro frontend**: Add to `src/data/games.ts`, add image to `public/images/games/`, push to deploy
2. **Pterodactyl**: Create nest, import egg JSON from `eggs/` directory
3. **Paymenter**: Create product, add plans/prices, add ConfigOption with children for tiers, set server settings (nest_id, egg_id, memory, etc.)

See [CLAUDE.md](./CLAUDE.md) for detailed instructions.

## DNS

Managed via Cloudflare:
- `pocketburrito.ca` → Cloudflare Pages
- `billing.pocketburrito.ca` → A record to 5.78.100.72 (proxied)
- `panel.pocketburrito.ca` → A record to 5.78.100.72 (proxied)
