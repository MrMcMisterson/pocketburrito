# PocketBurrito - Claude Code Context

This file provides context for Claude Code sessions working on PocketBurrito.

## Project Overview

PocketBurrito is a game server hosting business. The infrastructure consists of:

- **Frontend (pocketburrito.ca)**: Astro + Tailwind CSS static site, deployed via Cloudflare Pages from this repo
- **Billing (billing.pocketburrito.ca)**: Paymenter v2 billing system with custom "pocketburrito" theme
- **Game Panel (panel.pocketburrito.ca)**: Pterodactyl panel for game server management
- **Server**: Single Hetzner VPS at `5.78.100.72` running all services

## Architecture

```
pocketburrito.ca (Cloudflare Pages)     billing.pocketburrito.ca (Paymenter)
       │                                          │
       │  User browses games                      │  User checks out & manages services
       │  /games, /games/{slug}                   │  /products/game-servers/{slug}/checkout
       │                                          │  /tickets, /services, /login
       └──── "Order Now" ─────────────────────────┘
                                                  │
                                          panel.pocketburrito.ca (Pterodactyl)
                                                  │
                                          Game servers provisioned automatically
```

### Unified Frontend Experience
- All "Order Now" buttons on pocketburrito.ca link to `/games` (browse first)
- Game detail pages link directly to `billing.pocketburrito.ca/products/game-servers/{slug}/checkout`
- Nginx redirects on billing prevent users from seeing Paymenter's public pages:
  - `billing.pocketburrito.ca/` → `pocketburrito.ca`
  - `billing.pocketburrito.ca/products/game-servers` → `pocketburrito.ca/games`
  - `billing.pocketburrito.ca/products/game-servers/{slug}` → `pocketburrito.ca/games/{slug}`
- Checkout, auth, tickets, and client area remain on billing.pocketburrito.ca

## Server Access

- **SSH**: `ssh rpuderak@5.78.100.72`
- **Sudo password**: *(stored locally, not in repo — see local `.env` or password manager)*
- **Paymenter admin**: `https://billing.pocketburrito.ca/admin`
- **Pterodactyl admin**: `https://panel.pocketburrito.ca/admin`
- **Pterodactyl API key**: *(stored locally, not in repo)*

## Key Server Paths

| Path | Purpose |
|------|---------|
| `/var/www/paymenter/paymenter/` | Paymenter installation root |
| `/var/www/paymenter/paymenter/.env` | Paymenter environment config |
| `/var/www/paymenter/paymenter/themes/pocketburrito/` | Custom Paymenter theme |
| `/var/www/pterodactyl/` | Pterodactyl panel installation |
| `/etc/nginx/sites-enabled/paymenter.conf` | Billing site Nginx config (has redirects) |
| `/etc/nginx/sites-enabled/pterodactyl.conf` | Panel Nginx config |
| `/home/rpuderak/deploy-theme.sh` | Theme deployment script |

## SSH Command Pattern

When running sudo commands on the server, use bash scripts:
```bash
# Write script locally, SCP to server, fix line endings, execute
scp script.sh rpuderak@5.78.100.72:/tmp/script.sh
ssh rpuderak@5.78.100.72 "sed -i 's/\r$//' /tmp/script.sh && bash /tmp/script.sh"
```

Inside scripts, use this sudo pattern:
```bash
echo "$SUDO_PASS" | sudo -S command 2>/dev/null
```
*(Set `SUDO_PASS` from environment variable or prompt — never hardcode credentials in scripts)*

## Database

- **MySQL** on the server, accessible as root (with sudo password)
- **Paymenter DB**: `paymenter`
- **Pterodactyl DB**: `panel`
- Query pattern: `echo "$SUDO_PASS" | sudo -S mysql -u root paymenter -e "SQL_HERE" 2>/dev/null`

## Product Structure (Paymenter)

- **16 products** (one per game), IDs 53-68, in category "Game Servers" (slug: `game-servers`)
- **15 multi-tier games** use ConfigOptions:
  - Parent ConfigOption: name="Server Plan", env_variable="memory", type="select"
  - Children: one per tier (env_variable = RAM in MiB, e.g., "3072" for 3GB)
  - Each child has its own plan with FULL price (not price difference)
  - Product's own plan is set to "free" type (base plan is $0, config option adds full price)
- **Valheim** is single-tier but uses same ConfigOption pattern: product ID 54, one config option child (6GB RAM, $14.99/month)
- All products have Pterodactyl server settings (nest_id, egg_id, memory, disk, etc.)

### How Server Creation Works
1. Customer selects a ConfigOption child (e.g., "6GB RAM - $12.99")
2. `ExtensionHelper::getServiceProperties()` maps parent's `env_variable` key to child's `env_variable` value
3. `Pterodactyl::createServer()` merges product settings with properties via `array_merge($settings, $properties)`
4. The config option value overrides the product's base memory setting

## Pterodactyl Setup

- **1 node** (Node 1) on the same server
- **10 custom nests** created for game categories
- **Eggs imported** with proper startup commands and variables (egg JSONs in `/eggs/` directory)
- All products reference specific nest_id and egg_id in their server settings

## Games (16 total)

### Survival Games (survivalGames / mediumTierGames)
Minecraft, Valheim, Palworld, Project Zomboid, Enshrouded, 7 Days to Die, Sons of the Forest, Rust, ARK: Survival Evolved, V Rising

### Sandbox Games (sandboxGames / lightTierGames)
Terraria, Satisfactory, Factorio, Core Keeper, ECO, Garry's Mod

## Repo Structure

```
pocketburrito/
├── src/
│   ├── data/games.ts          # All game definitions with tiers/pricing
│   ├── layouts/Layout.astro   # Nav + footer (shared across all pages)
│   └── pages/
│       ├── index.astro        # Homepage
│       ├── games.astro        # Games listing (light + medium tiers)
│       ├── games/[slug].astro # Individual game pages with pricing cards
│       ├── pricing.astro      # Pricing comparison
│       └── docs.astro         # Documentation
├── public/images/games/       # Game header images (16 JPGs)
├── eggs/                      # Pterodactyl egg JSON files
├── themes/pocketburrito/      # Paymenter theme (Blade templates + Tailwind)
├── scripts/                   # Server maintenance scripts
├── docs/                      # Project documentation
│   ├── PROJECT_STATUS.md      # Complete project status and history
│   └── maintenance/           # Security audit, issue tracking, etc.
├── CLAUDE.md                  # This file (Claude Code context)
├── astro.config.mjs           # Site URL: https://pocketburrito.ca
└── tailwind.config.mjs        # Custom gaming color palette
```

## Paymenter Theme

The custom `pocketburrito` theme lives in `themes/pocketburrito/` and is deployed to the server at `/var/www/paymenter/paymenter/themes/pocketburrito/`. Key customizations:
- Navigation with PocketBurrito branding, matching Astro site links
- Footer with Quick Links, Support, Legal sections
- Product listing shows "From $X.XX" for config-option products (custom Blade logic)
- Product detail page with same pricing logic
- Dark theme matching the Astro frontend

## Common Tasks

### Deploy Astro frontend
Push to `main` branch → Cloudflare Pages auto-deploys.

### Deploy Paymenter theme changes
```bash
# Use the deployment script on the server
ssh rpuderak@5.78.100.72 "bash /home/rpuderak/deploy-theme.sh"
```
Or SCP files directly and clear view cache:
```bash
echo "$SUDO_PASS" | sudo -S php /var/www/paymenter/paymenter/artisan view:clear
```

### Add a new game
1. Add game data to `src/data/games.ts` (with tiers array)
2. Add game image to `public/images/games/{slug}.jpg`
3. Add Pterodactyl egg to `eggs/{slug}.json`
4. Create nest and import egg in Pterodactyl panel
5. Create product in Paymenter with plans, config options, and server settings
6. Push Astro changes to deploy

### Run PHP on the server
```bash
# SCP a PHP script, fix line endings, execute with Paymenter's artisan
scp script.php rpuderak@5.78.100.72:/tmp/script.php
ssh rpuderak@5.78.100.72 "sed -i 's/\r$//' /tmp/script.php && echo \"\$SUDO_PASS\" | sudo -S php /tmp/script.php 2>/dev/null"
```

## GitHub Issues

The repo uses GitHub Issues for project tracking with epics (1-7) and stories. Most infrastructure, product, and frontend stories are complete. Remaining open issues are primarily around launch preparation, monitoring, backups, and growth optimization.

## Known Limitations

- Paymenter API is admin-only — no public/client API for products or checkout
- Minecraft image uses Minecraft Legends header (Minecraft Java isn't on Steam)
- Cloudflare caches images aggressively — use filename changes for cache busting
- Single server runs everything (panel, billing, game servers) — not yet scaled to separate nodes
