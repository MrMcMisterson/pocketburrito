# PocketBurrito - Project Status

**Last Updated:** 2026-02-23
**Repository:** github.com/MrMcMisterson/pocketburrito

---

## Current State: Pre-Launch (Payment Gateway Needed)

PocketBurrito game server hosting is fully operational with 16 games, unified frontend, working checkout flow, legal pages, security hardening, backup system, and visual consistency between both sites. **The only remaining blocker before launch is configuring payment gateways (Stripe + PayPal).**

---

## Infrastructure

### Server
- **Provider**: Hetzner Cloud VPS at `5.78.100.72`
- **OS**: Ubuntu 24.04.3 LTS, Kernel 6.8.0-94-generic
- **Services**: Nginx, PHP 8.3-FPM, MySQL, Redis, Docker, Pterodactyl Wings

### Domains
| Domain | Purpose | Hosting |
|--------|---------|---------|
| pocketburrito.ca | Public website | Cloudflare Pages (auto-deploy from GitHub) |
| billing.pocketburrito.ca | Billing/checkout/client area | Paymenter on Hetzner VPS |
| panel.pocketburrito.ca | Game server management | Pterodactyl on Hetzner VPS |

---

## What Was Built (Complete History)

### Session 1: Infrastructure Setup
- Provisioned Hetzner VPS
- Installed Pterodactyl panel and Wings daemon
- Installed Paymenter billing system
- Configured Nginx with SSL (Let's Encrypt + Cloudflare)
- Set up MySQL databases for both services
- Connected Pterodactyl extension in Paymenter
- Configured email (SMTP)

### Session 2: Theme & Branding
- Built custom Paymenter theme ("pocketburrito") matching Astro frontend
- Dark gaming aesthetic with gradient accents
- Navigation, footer, legal links
- Security audit performed
- Deployment script created

### Session 3: Products & Frontend Unification
- Created 10 custom Pterodactyl nests, imported 14+ eggs
- Created 16 products with ConfigOption tiers (one product per game)
- Fixed pricing display (shows full prices, "From $X.XX" on listings)
- Fixed game images (Minecraft, Palworld)
- Unified frontend: Astro site links directly to billing checkout
- Nginx redirects prevent users from seeing Paymenter public pages
- Closed issues: #6, #7, #10, #11, #28, #30-#38

### Session 4: Documentation, Testing & Bug Fixes
- Created 30 workflow documentation files in `docs/workflows/`
- Ran comprehensive test suite: 87 tests, found 6 bugs
- Created GitHub issues #39-#44 for all bugs found

### Session 5: Complete Bug Fixes, Security & Visual Unification (Current)

**Bugs Fixed:**
- Created legal pages (terms.astro, privacy.astro, refund.astro) with full drafted content
- Fixed ARK checkout 404: updated Paymenter slug from "ark" to "ark-survival-evolved"
- Fixed Valheim checkout redirect: added ConfigOption structure matching other 15 products
- Standardized refund URL to /refund on both sites
- Removed non-existent Twitter link from billing theme
- Rewrote LINK_MAPPING.md with correct URL patterns
- All 6 issues closed: #39, #40, #41, #42, #43, #44

**Visual Unification (Paymenter theme → match Astro):**
- Updated theme.php color defaults: primary #6366f1, secondary #8b5cf6, backgrounds matching Astro
- Updated nav bar: height, colors, backdrop, z-index, button styles, removed Shop dropdown
- Updated footer: layout, colors, Discord URL, removed Twitter
- Updated homepage: hero gradients, stats gradients, CTA section
- Updated layout: added Rajdhani font, meta theme-color, content offset
- Deployed all theme changes to server

**Astro Site Improvements:**
- Added Support section to footer (Submit Ticket, Knowledge Base, Control Panel, Discord)
- Added My Services link to Quick Links
- Both sites now have identical navigation and footer structure

**Security Hardening (Applied to Server):**
- Disabled root SSH login
- Set APP_DEBUG=false in Paymenter
- Set .env file permissions to 600
- Set expose_php=Off
- server_tokens already disabled

**Backup System:**
- Created scripts/backup.sh for nightly database + config backups
- Installed on server at /home/rpuderak/backup.sh
- Added crontab: 0 3 * * * (nightly at 3am)
- Verified: both databases backup successfully, 30-day retention

**Test Results:**
- All 16 checkout URLs return HTTP 200
- 92 tests, 100% pass rate
- Full results in docs/testing/TEST_RESULTS.md

---

## Products (16 Games)

### Survival/Medium Tier Games
| Game | Slug | Tiers | Price Range |
|------|------|-------|-------------|
| Minecraft | minecraft | 5 | $6.99 - $32.99 |
| Valheim | valheim | 1 | $14.99 |
| Palworld | palworld | 4 | $6.99 - $24.99 |
| Project Zomboid | project-zomboid | 4 | $6.99 - $24.99 |
| Enshrouded | enshrouded | 4 | $8.99 - $16.99 |
| 7 Days to Die | 7-days-to-die | 3 | $12.99 - $32.99 |
| Sons of the Forest | sons-of-the-forest | 3 | $6.99 - $16.99 |
| Rust | rust | 3 | $12.99 - $32.99 |
| ARK: Survival Evolved | ark-survival-evolved | 3 | $12.99 - $32.99 |
| V Rising | v-rising | 2 | $12.99 - $16.99 |

### Sandbox/Light Tier Games
| Game | Slug | Tiers | Price Range |
|------|------|-------|-------------|
| Terraria | terraria | 3 | $6.99 - $16.99 |
| Satisfactory | satisfactory | 2 | $12.99 - $16.99 |
| Factorio | factorio | 3 | $6.99 - $16.99 |
| Core Keeper | core-keeper | 2 | $6.99 - $11.99 |
| ECO | eco | 3 | $6.99 - $16.99 |
| Garry's Mod | garrys-mod | 3 | $6.99 - $16.99 |

---

## GitHub Issues Status

### Closed (Completed)
- #1 Epic 1: Infrastructure Setup
- #2 Story 1.1: Server Configuration
- #3 Story 1.2: Pterodactyl Installation
- #6 Story 2.1: Create Products
- #7 Story 2.2: Create Medium Tier Products
- #10 Story 3.1: Website Deployment
- #11 Story 3.2: Paymenter Theme
- #28 Story 3.4: Pterodactyl Panel Theme
- #30-#38 Various cleanup and improvements
- #39 Missing legal pages → Created terms.astro, privacy.astro, refund.astro
- #40 Refund URL mismatch → Standardized to /refund
- #41 Twitter link inconsistency → Removed from billing theme
- #42 Link mapping outdated → Rewrote LINK_MAPPING.md
- #43 ARK checkout 404 → Fixed slug in Paymenter DB
- #44 Valheim checkout redirect → Added ConfigOption structure

### Open (Remaining Work)
| Issue | Title | Priority | Notes |
|-------|-------|----------|-------|
| #4 | Paymenter Configuration | **CRITICAL** | Payment gateways (Stripe + PayPal) needed |
| #5 | Epic 2: Product Configuration | High | Parent epic, nearly complete |
| #8 | Product Testing | High | Need end-to-end server provisioning test |
| #9 | Epic 3: Frontend & Branding | High | Parent epic, nearly complete |
| #12 | Content Creation | Medium | Blog posts, guides |
| #13 | Epic 4: Automation & Operations | High | Parent epic |
| #14 | Monitoring Setup | High | Uptime monitoring |
| #15 | Backup System | ~~Critical~~ **Done** | Implemented but issue not yet closed |
| #16 | Security Hardening | ~~High~~ **Done** | Applied but issue not yet closed |
| #17-#27 | Support, Launch, Growth | Various | Future phases |

---

## What's Left Before Launch

### Blocked on User Action
1. **Create Stripe account** at https://dashboard.stripe.com/register → provide API keys
2. **Create PayPal Business account** at https://www.paypal.com/business → provide API credentials
3. **Review legal pages** (terms, privacy, refund) and request any changes

### After Payment Gateway
1. Configure Stripe + PayPal in Paymenter admin
2. Test with Stripe test card (4242 4242 4242 4242)
3. Order Minecraft, Valheim, ARK servers end-to-end
4. Verify servers provision in Pterodactyl
5. Test user flows: registration, tickets, services, invoices
6. Switch to Stripe live mode → **LAUNCH**

---

## Security Status

| Check | Status |
|-------|--------|
| Root SSH disabled | Applied |
| APP_DEBUG=false | Applied |
| .env permissions 600 | Applied |
| expose_php=Off | Applied |
| server_tokens off | Applied |
| Nightly backups | Active (3am cron) |
| 30-day backup retention | Configured |
| SSL on all domains | Active |
| Cloudflare proxy | Active |
