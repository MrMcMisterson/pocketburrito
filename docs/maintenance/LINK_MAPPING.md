# PocketBurrito Link Mapping

Last updated: 2026-02-17

## Navigation Links (Both Sites)

| Link Text | Astro Site (pocketburrito.ca) | Billing Site (billing.pocketburrito.ca) | Status |
|-----------|-------------------------------|----------------------------------------|--------|
| Home | `/` | `https://pocketburrito.ca` | OK |
| Games | `/games` | `https://pocketburrito.ca/games` | OK |
| Pricing | `/pricing` | `https://pocketburrito.ca/pricing` | OK |
| Docs | `/docs` | `https://pocketburrito.ca/docs` | OK |
| Panel Login | `https://panel.pocketburrito.ca` | `https://panel.pocketburrito.ca` | OK |
| Order Now | `https://billing.pocketburrito.ca` | `route('home')` (billing homepage) | OK |

## Footer Quick Links

| Link Text | Astro | Billing | Status |
|-----------|-------|---------|--------|
| Game Servers | `/games` | `https://pocketburrito.ca/games` | OK |
| Pricing | `/pricing` | `https://pocketburrito.ca/pricing` | OK |
| Documentation | `/docs` | `https://pocketburrito.ca/docs` | OK |
| Client Area | `https://billing.pocketburrito.ca` | `route('home')` | OK |

## Footer Legal Links

| Link Text | Astro | Billing | Status |
|-----------|-------|---------|--------|
| Terms of Service | `/terms` | `https://pocketburrito.ca/terms` | OK |
| Privacy Policy | `/privacy` | `https://pocketburrito.ca/privacy` | OK |
| Refund Policy | `/refund` | `https://pocketburrito.ca/refunds` | MISMATCH - Astro uses /refund, billing uses /refunds |

## Footer Social Links

| Platform | Astro | Billing | Status |
|----------|-------|---------|--------|
| Discord | `https://discord.gg/gjjGWYY7` | `https://discord.gg/gjjGWYY7` | OK (pending real invite link) |
| Twitter | (removed - no account) | `https://twitter.com/pocketburrito` | MISMATCH - billing has it, Astro removed it |

## Footer Differences

The billing site footer has an additional **Support** column:
- Submit Ticket (auth-gated)
- Knowledge Base (links to /docs)
- Control Panel (links to panel.pocketburrito.ca)
- Discord Community

The Astro site footer does not have this column (appropriate since support features are on the billing site).

## Page-Specific Links

### docs.astro
| Link | Destination | Status |
|------|-------------|--------|
| Join Discord | `https://discord.gg/gjjGWYY7` | FIXED (was yourgaminghost) |
| Open Ticket | `https://billing.pocketburrito.ca/tickets/create` | FIXED (was submitticket.php) |

### games/[slug].astro
| Link | Destination | Status |
|------|-------------|--------|
| Order buttons | `https://billing.pocketburrito.ca/order/{slug}` | OK |
| Tier buttons | `https://billing.pocketburrito.ca/order/{slug}-{tier}` | OK |

### index.astro
| Link | Destination | Status |
|------|-------------|--------|
| Order Now (hero) | `https://billing.pocketburrito.ca` | OK |
| Browse Games | `/games` | OK |
| View All Games | `/games` | OK |
| CTA Order | `https://billing.pocketburrito.ca` | OK |

### pricing.astro
| Link | Destination | Status |
|------|-------------|--------|
| Get Started | `https://billing.pocketburrito.ca` | OK |

## Action Items
1. Decide on `/refund` vs `/refunds` route naming and make consistent
2. Update Discord links once real invite is available
3. Consider adding Twitter/X link to Astro footer if account exists
