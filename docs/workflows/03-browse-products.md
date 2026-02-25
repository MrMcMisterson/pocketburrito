# User Workflow: Browse & Select Products

## Overview
User browses available game servers on pocketburrito.ca and selects one to order.

## Architecture Note
Product browsing happens on the **Astro frontend** (pocketburrito.ca), NOT on billing.pocketburrito.ca. Nginx redirects ensure:
- `billing.pocketburrito.ca/` -> `pocketburrito.ca`
- `billing.pocketburrito.ca/products/game-servers` -> `pocketburrito.ca/games`
- `billing.pocketburrito.ca/products/game-servers/{slug}` -> `pocketburrito.ca/games/{slug}`

## Entry Points
1. **Homepage:** https://pocketburrito.ca -> Click game card or "Order Now"
2. **Games page:** https://pocketburrito.ca/games -> Browse all 16 games
3. **Pricing page:** https://pocketburrito.ca/pricing -> Compare plans
4. **Navigation:** "Games" link in nav bar

## Games Page Layout (pocketburrito.ca/games)

### Light Tier Games (Sandbox)
Simple cards showing lowest tier price. 6 games:

| Game | Starting Price | Tiers |
|------|---------------|-------|
| Terraria | $6.99/mo | 3 (2-4GB) |
| Satisfactory | $12.99/mo | 2 (6-8GB) |
| Factorio | $6.99/mo | 3 (3-6GB) |
| Core Keeper | $6.99/mo | 2 (3-4GB) |
| ECO | $6.99/mo | 3 (4-8GB) |
| Garry's Mod | $6.99/mo | 3 (2-6GB) |

### Medium Tier Games (Survival)
Cards with "Starting at" pricing. 10 games:

| Game | Starting Price | Tiers | Max Price |
|------|---------------|-------|-----------|
| Minecraft | $6.99/mo | 5 (3-16GB) | $32.99 |
| Valheim | $14.99/mo | 1 (6GB) | $14.99 |
| Palworld | $6.99/mo | 4 (4-12GB) | $24.99 |
| Project Zomboid | $6.99/mo | 4 (3-8GB) | $24.99 |
| Enshrouded | $8.99/mo | 4 (4-10GB) | $16.99 |
| 7 Days to Die | $12.99/mo | 3 (6-16GB) | $32.99 |
| Sons of the Forest | $6.99/mo | 3 (6-12GB) | $16.99 |
| Rust | $12.99/mo | 3 (6-16GB) | $32.99 |
| ARK: Survival Evolved | $12.99/mo | 3 (6-16GB) | $32.99 |
| V Rising | $12.99/mo | 2 (6-8GB) | $16.99 |

## Steps

### 1. View Games Listing
- Navigate to https://pocketburrito.ca/games
- See all 16 games organized by tier
- Each card shows: game image, name, starting price, brief description

### 2. Click a Game
- Click game card to view detail page
- URL: https://pocketburrito.ca/games/{slug}
- Example: https://pocketburrito.ca/games/minecraft

### 3. View Game Detail Page
- Game description and features
- Pricing table with all tiers (RAM, players, price)
- "Order Now" button per tier
- Each "Order Now" links to: `https://billing.pocketburrito.ca/products/game-servers/{slug}/checkout`

### 4. Click "Order Now"
- Redirects to Paymenter checkout page on billing.pocketburrito.ca
- User must be logged in (redirected to login if not)
- Checkout page shows product configuration and pricing

## Product Types

### Multi-Tier (15 games)
- ConfigOption parent: "Server Plan" with env_variable="memory"
- ConfigOption children: one per tier with RAM value and full price
- Product base plan is $0 ("free" type); config option adds full price
- User selects tier at checkout

### Single-Tier (Valheim only)
- Product ID 54, Plan ID 59
- Fixed at $14.99/mo recurring
- No ConfigOption needed

## Success Criteria
- All 16 game cards display on /games
- Each game card links to correct detail page
- Detail pages show accurate pricing tiers
- "Order Now" links go to correct billing checkout URLs
- Nginx redirects work (billing product pages -> Astro frontend)

## Related Workflows
- [04-checkout.md](04-checkout.md)
- [05-shopping-cart.md](05-shopping-cart.md)

## Test Scenarios
1. **Games Page Loads:** All 16 games visible with correct images and prices
2. **Game Detail Page:** Click Minecraft -> Shows 5 tiers with correct pricing
3. **Valheim Detail Page:** Single tier at $14.99
4. **Order Now Link:** Click "Order Now" on any tier -> Goes to billing checkout
5. **Nginx Redirect:** Visit billing.pocketburrito.ca/products/game-servers -> Redirected to pocketburrito.ca/games
6. **Nginx Redirect (slug):** Visit billing.pocketburrito.ca/products/game-servers/minecraft -> Redirected to pocketburrito.ca/games/minecraft
7. **All Images Load:** Check all 16 game images display (no broken images)
8. **Pricing Accuracy:** Compare games.ts data to displayed prices

---
**Status:** Documented | Testing Pending
