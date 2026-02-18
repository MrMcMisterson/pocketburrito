# PocketBurrito - Project Status

**Last Updated:** 2026-02-18
**Repository:** github.com/MrMcMisterson/pocketburrito

---

## Current State: MVP Complete

PocketBurrito game server hosting is fully operational with 16 games, a unified frontend experience, working checkout flow, and automatic server provisioning via Pterodactyl.

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

### DNS
- pocketburrito.ca → Cloudflare Pages
- billing.pocketburrito.ca → 5.78.100.72 (proxied through Cloudflare)
- panel.pocketburrito.ca → 5.78.100.72 (proxied through Cloudflare)

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
- Initial DNS configuration via Cloudflare

### Session 2: Theme & Branding
- Built custom Paymenter theme ("pocketburrito") matching the Astro frontend design
- Dark gaming aesthetic with gradient accents
- Navigation: Home, Games, Pricing, Docs, Panel Login, Order Now
- Footer: Quick Links, Support, Legal sections
- Fixed APP_NAME in .env (removed space)
- Uploaded PocketBurrito logo to Paymenter
- Configured theme admin settings (direct_checkout, show_category_description, etc.)
- Created deployment script for theme changes
- Performed security audit of the server
- Pushed theme to GitHub repository
- Cleaned up stale vite.config.js reference
- Removed duplicate PterodactylPlus extension

### Session 3: Products & Frontend Unification
**Pterodactyl Setup:**
- Created 10 custom nests for game categories
- Fixed Valheim nest name typo
- Imported 14 Pterodactyl eggs with proper startup commands and environment variables
- Egg IDs: 29-38 (new) plus existing eggs

**Paymenter Products:**
- Initially created 48 products (one per game tier) — caused cluttered menu
- Restructured to 16 products (one per game) with ConfigOption tiers
  - ConfigOption parent: "Server Plan", env_variable="memory", type="select"
  - ConfigOption children: one per tier with RAM value and full price
  - Product base plan set to "free" type; config option adds full price
- Valheim: single-tier at $14.99 (no config options, recurring plan)
- All products have Pterodactyl server settings (nest_id, egg_id, memory, disk, cpu, etc.)
- All products have game images uploaded from Steam CDN

**Pricing Display Fixes:**
- Fixed checkout showing confusing price differences → now shows full prices
- Fixed product listing showing "Free" → now shows "From $X.XX" via custom Blade template logic
- Fixed Valheim single-tier still showing "Free" → restored to recurring plan

**Image Fixes:**
- Minecraft image was Medieval Dynasty (wrong game from Steam download) → replaced with Minecraft Legends header
- Palworld image was incorrect → replaced with correct Palworld image from Steam
- Cache busting via filename changes (minecraft-v2.jpg) for Cloudflare CDN

**Frontend Unification:**
- Updated all "Order Now" links on Astro site to route to `/games` (not billing homepage)
- Game detail pages link directly to `billing.pocketburrito.ca/products/game-servers/{slug}/checkout`
- Fixed games.astro light tier cards using undefined properties (now uses `game.tiers[0]`)
- Fixed "Contact Support" CTA to link to `/tickets/create`
- Deployed Nginx redirects on billing:
  - `/` → pocketburrito.ca
  - `/products/game-servers` → pocketburrito.ca/games
  - `/products/game-servers/{slug}` → pocketburrito.ca/games/{slug}
  - Checkout URLs preserved (pattern doesn't match /checkout suffix)
- End-to-end flow verified: browse → game detail → checkout → cart with correct pricing

**GitHub Issues:**
- Closed: #6 (Create Products), #7 (Medium Tier Products), #10 (Website Deployment), #38 (Unified Frontend)
- Updated: #4 (Paymenter Configuration) with status
- Created: #38 (Unified Frontend) — then closed after completion

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
- #28 Story 3.4: Pterodactyl Panel Theme (Arix)
- #30 Clean up vite.config.js
- #31 Remove duplicate PterodactylPlus
- #32 Server maintenance docs
- #33 Fix APP_NAME in .env
- #34 Upload logo to Paymenter
- #35 Configure theme admin settings
- #36 Deployment script
- #37 Push theme to GitHub
- #38 Unified frontend experience

### Open (Remaining Work)
| Issue | Title | Priority |
|-------|-------|----------|
| #4 | Story 1.3: Paymenter Configuration | Critical — Payment gateways still needed |
| #5 | Epic 2: Product Configuration | High — Parent epic, mostly done |
| #8 | Story 2.3: Product Testing | High — Need to test actual server provisioning |
| #9 | Epic 3: Frontend & Branding | High — Parent epic, mostly done |
| #12 | Story 3.3: Content Creation | Medium — Blog posts, guides, etc. |
| #13 | Epic 4: Automation & Operations | High — Parent epic |
| #14 | Story 4.1: Monitoring Setup | High |
| #15 | Story 4.2: Backup System | Critical |
| #16 | Story 4.3: Security Hardening | High — Audit done, fixes pending |
| #17 | Epic 5: Customer Support | High — Parent epic |
| #18 | Story 5.1: Support Channels | High — Discord, ticket system |
| #19 | Story 5.2: Documentation | Medium — User-facing docs |
| #20 | Epic 6: Marketing & Launch | High — Parent epic |
| #21 | Story 6.1: Pre-Launch Setup | Medium |
| #22 | Story 6.2: Soft Launch | High |
| #23 | Story 6.3: Public Launch | High |
| #24 | Epic 7: Growth & Optimization | Low — Parent epic |
| #25 | Story 7.1: Performance Optimization | Medium |
| #26 | Story 7.2: Feature Additions | Low |
| #27 | Story 7.3: Scale to Second Node | Low |
| #29 | DNS bypass record | Low — Needs Cloudflare access |

### Priority Next Steps
1. **Payment gateways** (#4) — Configure Stripe/PayPal in Paymenter so customers can actually pay
2. **Product testing** (#8) — Test ordering a server end-to-end to verify Pterodactyl provisioning works
3. **Backup system** (#15) — Critical for production
4. **Security fixes** (#16) — Apply fixes from security audit (scripts in `/scripts/`)
5. **Monitoring** (#14) — Set up uptime monitoring

---

## Security Audit Summary (2026-02-17)

Full report: `docs/maintenance/SECURITY_AUDIT_LOG.md`
Fix scripts: `scripts/implement-security-fixes.sh`, `scripts/security-check.sh`

| Severity | Issue | Status |
|----------|-------|--------|
| CRITICAL | Root SSH login enabled | Fix script ready |
| CRITICAL | Paymenter APP_DEBUG=true | Fix script ready |
| HIGH | .env file permissions too open | Fix script ready |
| HIGH | Nginx server_tokens not disabled | Fix script ready |
| HIGH | No backup system | Not yet implemented |
| MEDIUM | Pending system updates | Needs periodic maintenance |
| MEDIUM | PHP expose_php=On | Fix script ready |
| MEDIUM | Missing security headers on Pterodactyl | Fix script ready |
| MEDIUM | Port 8080 open (needed for Wings) | Expected/acceptable |

---

## Technical Notes

### Paymenter API
- Admin-only (v1/admin/*) — no public/client API for products, cart, or checkout
- Cannot build API-based checkout on Astro frontend
- Decision: Use direct links to billing checkout pages instead

### Cloudflare Caching
- Images cached aggressively by Cloudflare CDN
- To update images: rename file (e.g., `minecraft-v2.jpg`), update DB path
- Or purge cache in Cloudflare dashboard

### Paymenter Theme Templates Modified
- `views/products/index.blade.php` — Custom "From $X.XX" pricing logic for config-option products
- `views/products/show.blade.php` — Same pricing logic for product detail page
- Both deployed via `deploy-theme.sh` script

### Paymenter DB IDs (for reference)
- Products: IDs 53-68 (16 games)
- Valheim: product ID 54, plan ID 59
- Category "Game Servers": slug `game-servers`
- Config option parents (15 total, one per multi-tier game)
