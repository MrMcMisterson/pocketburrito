# PocketBurrito: Complete Project Execution Plan

**Created:** 2026-02-18
**Status:** Approved, execution in progress

---

## Context

PocketBurrito is a game server hosting business with 3 domains (Astro frontend, Paymenter billing, Pterodactyl panel). Session 4 completed workflow documentation (30 files), testing (87 tests, 82% pass), and identified 6 bugs. However, major blockers remain: no payment gateway is configured (customers literally cannot pay), visual inconsistencies between the two sites, missing legal pages, broken checkout URLs for 2 games, no way to access tickets/services, security fixes not applied, and no backup system. The goal is to fix everything AND end-to-end test with actual servers spun up through the web interface.

---

## Phase 1: Payment Gateway Setup (CRITICAL BLOCKER)

Nothing else matters if customers can't pay. This must be done first.

### 1A. Create Stripe Account
- User creates a Stripe account at https://dashboard.stripe.com/register
- Business name: PocketBurrito
- Business type: Online services / Game server hosting
- After signup, get API keys from Developers > API Keys
- We need: **Publishable key** (pk_test_... / pk_live_...) and **Secret key** (sk_test_... / sk_live_...)
- Start in **test mode** for verification

### 1B. Configure Stripe in Paymenter
- SSH to server (`ssh rpuderak@5.78.100.72`)
- Access Paymenter admin at `billing.pocketburrito.ca/admin`
- Navigate to Settings > Extensions > Payment Gateways
- Enable and configure Stripe with API keys
- Configure webhook URL: `https://billing.pocketburrito.ca/extensions/stripe/webhook`

### 1C. Create PayPal Business Account
- User creates a PayPal Business account at https://www.paypal.com/business
- Get API credentials from Developer Dashboard > REST API apps
- We need: **Client ID** and **Secret**

### 1D. Configure PayPal in Paymenter
- Same admin panel: Settings > Extensions > Payment Gateways
- Enable and configure PayPal with Client ID and Secret
- Set sandbox mode first for testing

### 1E. Test Payments
- Test Stripe with test card `4242 4242 4242 4242`
- Test PayPal with sandbox account
- Verify: Invoice marked "Paid", Pterodactyl API called to create server

---

## Phase 2: Fix Broken Checkouts (CRITICAL)

### 2A. Fix ARK Slug Mismatch (Issue #43)
- Rename Paymenter product slug from `ark` to `ark-survival-evolved` in the database
- Clear Paymenter cache
- Verify checkout URL returns 200

### 2B. Fix Valheim Checkout (Issue #44)
- Add ConfigOption to Valheim matching the 15 other games' structure
- Parent: "Server Plan", env_variable="memory", type="select"
- Child: "6GB RAM - 10 Players", env_variable="6144", $14.99/month
- Set base product plan to "free" type
- Verify checkout URL returns 200

---

## Phase 3: Create Legal Pages (CRITICAL)

### 3A. Create Astro Pages with Drafted Legal Content
- `src/pages/terms.astro` — Terms of Service (account creation, acceptable use, payment terms, service levels, termination, liability)
- `src/pages/privacy.astro` — Privacy Policy (data collected, third-party services, cookies, GDPR/CCPA rights)
- `src/pages/refund.astro` — Refund Policy (48-hour window, proration, how to request, exceptions)

### 3B. Fix Refund URL Mismatch (Issue #40)
- Change billing theme footer from `/refunds` to `/refund`

---

## Phase 4: Visual Unification (Color Scheme + Nav Bar)

Make the Paymenter billing theme look identical to the Astro frontend. Astro is the source of truth.

### Color Changes (theme.php)
| Setting | Current | New |
|---------|---------|-----|
| dark-primary | `#8b5cf6` | `#6366f1` |
| dark-secondary | `#ec4899` | `#8b5cf6` |
| dark-neutral | `#2d2d4a` | `#1f2937` |
| dark-background | `#0a0a1f` | `#050810` |
| dark-background-secondary | `#13132b` | `#0a0e1a` |

### Nav Bar Changes
- Background: `#0a0a1f` → `#0a0e1a`, border: purple → gray-800
- Height: h-14 → h-16, z-index: 20 → 50
- Logo gradient: purple-pink → indigo-purple, size: lg → xl
- Link color: gray-100 → gray-300, remove text-sm
- Order Now button: solid pill → gradient rounded-lg
- Remove Shop dropdown, add Rajdhani font

### Footer Changes
- Max-width: 1400px → 7xl, brand column: 1-col → 2-col
- Logo gradient: purple-pink → indigo-purple
- Link hover: purple → white
- Remove Twitter link, fix Discord URL

### Homepage Changes
- Update all hardcoded gradients to match Astro color scheme

---

## Phase 5: Add Tickets & Services Access

### Astro Site
- Add "Support" section to footer (Submit Ticket, Knowledge Base, Control Panel, Discord)
- Add "My Services" link to Quick Links

### Paymenter
- Verify Services and Tickets are in logged-in user dropdown
- Add explicit links if missing

---

## Phase 6: Security Hardening

Apply fixes from existing `scripts/implement-security-fixes.sh`:
1. Disable root SSH login (CRITICAL)
2. Set APP_DEBUG=false (CRITICAL)
3. Fix .env file permissions to 600 (HIGH)
4. Disable server_tokens in nginx (HIGH)
5. Set expose_php=Off (MEDIUM)
6. Add security headers to Pterodactyl (MEDIUM)
7. System updates (MEDIUM)

Run `scripts/security-check.sh` to verify.

---

## Phase 7: Backup System Setup

- Create `scripts/backup.sh` for nightly database + file backups
- Backup both databases (paymenter + panel), .env files, nginx configs
- 30-day retention
- Add to crontab: `0 3 * * * /home/rpuderak/backup.sh`

---

## Phase 8: End-to-End Testing with Real Server Provisioning

### Test Orders (3 games minimum)
1. **Minecraft** — Multi-tier, most popular. Select 3GB tier ($6.99), pay with Stripe test card, verify server provisions in Pterodactyl
2. **Valheim** — Single-tier, previously broken. Verify ConfigOption fix works, server provisions with 6GB RAM
3. **ARK** — Previously 404. Verify slug fix works, server provisions with correct nest/egg

### Test User Flows
- Registration, login, forgot password
- Submit support ticket, view tickets
- View "My Services", cancel service
- View invoices, payment history

### Test Visual Consistency
- Compare nav bars side-by-side
- Verify colors, fonts, logos match
- Mobile responsive check

### Test Legal Pages
- /terms, /privacy, /refund all serve real content

---

## Phase 9: Documentation Update & Cleanup

- Rewrite `docs/testing/TEST_RESULTS.md` with comprehensive results
- Update `docs/PROJECT_STATUS.md` with all completed work
- Fix `docs/maintenance/LINK_MAPPING.md` URL patterns
- Close GitHub issues: #39, #40, #41, #42, #43, #44, #4, #8, #16
- Final push to GitHub

---

## Execution Order

| Step | Phase | What | Blocker? |
|------|-------|------|----------|
| 1 | 2A | Fix ARK slug in database | No |
| 2 | 2B | Fix Valheim ConfigOption | No |
| 3 | 3A | Create legal pages | No |
| 4 | 4 | Visual unification (all theme files) | No |
| 5 | 3B+5 | Fix footer links + add tickets/services | No |
| 6 | — | Git push to GitHub | No |
| 7 | — | Deploy theme to server | Needs step 6 |
| 8 | 6 | Apply security fixes | No |
| 9 | 7 | Set up backup system | No |
| 10 | 1 | Configure Stripe + PayPal | **USER must provide API keys** |
| 11 | 8 | End-to-end testing with real servers | Needs step 10 |
| 12 | 9 | Update docs, close issues, final push | Needs step 11 |

**Steps 1-9 can be done immediately.** Step 10 blocked on user creating Stripe/PayPal accounts.

---

## User Action Required

1. **Create Stripe account** at https://dashboard.stripe.com/register → provide API keys
2. **Create PayPal Business account** at https://www.paypal.com/business → provide API credentials
3. **Review legal pages** after Claude drafts them
