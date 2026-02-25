# PocketBurrito Link Mapping

Last updated: 2026-02-19

## Navigation Links (Both Sites)

| Link Text | Astro Site (pocketburrito.ca) | Billing Site (billing.pocketburrito.ca) | Status |
|-----------|-------------------------------|----------------------------------------|--------|
| Home | `/` | `https://pocketburrito.ca` | OK |
| Games | `/games` | `https://pocketburrito.ca/games` | OK |
| Pricing | `/pricing` | `https://pocketburrito.ca/pricing` | OK |
| Docs | `/docs` | `https://pocketburrito.ca/docs` | OK |
| Panel Login | `https://panel.pocketburrito.ca` | `https://panel.pocketburrito.ca` | OK |
| Order Now | `/games` | `route('home')` (billing homepage) | OK |

## Footer Quick Links

| Link Text | Astro | Billing | Status |
|-----------|-------|---------|--------|
| Game Servers | `/games` | `https://pocketburrito.ca/games` | OK |
| Pricing | `/pricing` | `https://pocketburrito.ca/pricing` | OK |
| Documentation | `/docs` | `https://pocketburrito.ca/docs` | OK |
| Client Area | `https://billing.pocketburrito.ca` | `route('home')` | OK |
| My Services | `https://billing.pocketburrito.ca/services` | N/A (in nav dropdown) | OK |

## Footer Support Links (Both Sites)

| Link Text | Astro | Billing | Status |
|-----------|-------|---------|--------|
| Submit Ticket | `https://billing.pocketburrito.ca/tickets/create` | `route('tickets')` (auth-gated) | OK |
| Knowledge Base | `/docs` | `https://pocketburrito.ca/docs` | OK |
| Control Panel | `https://panel.pocketburrito.ca` | `https://panel.pocketburrito.ca` | OK |
| Discord Community | `https://discord.gg/gjjGWYY7` | `https://discord.gg/gjjGWYY7` | OK |

## Footer Legal Links

| Link Text | Astro | Billing | Status |
|-----------|-------|---------|--------|
| Terms of Service | `/terms` | `https://pocketburrito.ca/terms` | OK |
| Privacy Policy | `/privacy` | `https://pocketburrito.ca/privacy` | OK |
| Refund Policy | `/refund` | `https://pocketburrito.ca/refund` | OK (standardized to /refund) |

## Footer Social Links

| Platform | Astro | Billing | Status |
|----------|-------|---------|--------|
| Discord | `https://discord.gg/gjjGWYY7` | `https://discord.gg/gjjGWYY7` | OK |

## Checkout Links (games/[slug].astro)

| Link | Destination | Status |
|------|-------------|--------|
| Order Now buttons | `https://billing.pocketburrito.ca/products/game-servers/{slug}/checkout` | OK |

All 16 games use the same URL pattern. Tier selection happens on the Paymenter checkout page via ConfigOption dropdown.

## Nginx Redirects (billing.pocketburrito.ca)

| From | To | Status |
|------|----|--------|
| `/` | `https://pocketburrito.ca` | 301 OK |
| `/products/game-servers` | `https://pocketburrito.ca/games` | 301 OK |
| `/products/game-servers/{slug}` | `https://pocketburrito.ca/games/{slug}` | 301 OK |
| `/products/game-servers/{slug}/checkout` | NOT redirected (preserved) | OK |

## Resolved Issues
- `/refund` vs `/refunds` mismatch: Standardized to `/refund` on both sites
- Twitter link removed from billing footer (no account exists)
- Discord URL standardized to `https://discord.gg/gjjGWYY7` on both sites
- Support section added to Astro footer (was previously only on billing)
- My Services link added to Astro Quick Links
