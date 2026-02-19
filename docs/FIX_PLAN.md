# PocketBurrito Comprehensive Fix Plan

**Created:** 2026-02-18
**Priority Order:** Critical fixes first, then visual unification, then polish

---

## Overview

This plan addresses all 15 known issues in priority order, with the visual unification (color scheme + nav bar consistency) as a major component. The goal is to make pocketburrito.ca and billing.pocketburrito.ca look and feel like the same site.

---

## Fix 1: Create Missing Legal Pages (CRITICAL) — Issue #39

**Problem:** /terms, /privacy, /refund all serve the homepage because no Astro page files exist. Cloudflare Pages SPA fallback returns index.html for unknown routes.

**Files to create:**
- `src/pages/terms.astro` — Terms of Service
- `src/pages/privacy.astro` — Privacy Policy
- `src/pages/refund.astro` — Refund Policy

**Implementation:**
1. Create each page using the existing `Layout.astro` wrapper
2. Write real legal content covering:
   - **Terms:** Account creation, acceptable use, payment terms, service level, termination, liability
   - **Privacy:** Data collection, cookies, third-party services (Cloudflare, Stripe/PayPal, Pterodactyl), data retention, user rights
   - **Refund:** Refund eligibility window, proration policy, how to request, exceptions
3. Style consistently with the rest of the site (dark gaming theme, proper headings)
4. Push to main → Cloudflare Pages auto-deploys

**Also fixes:** The footer links on both sites that currently point to these broken URLs.

---

## Fix 2: Fix ARK Checkout 404 (CRITICAL) — Issue #43

**Problem:** Astro site uses slug `ark-survival-evolved` but Paymenter product uses slug `ark`. The checkout URL `billing.pocketburrito.ca/products/game-servers/ark-survival-evolved/checkout` returns 404.

**Options (pick one):**
- **Option A (Recommended):** Rename the Paymenter product slug from `ark` to `ark-survival-evolved` via admin panel or database
- **Option B:** Change the Astro slug from `ark-survival-evolved` to `ark` in games.ts (would also change the Astro URL)

**Implementation (Option A):**
1. SSH to server
2. Run: `UPDATE products SET slug = 'ark-survival-evolved' WHERE slug = 'ark';` on the paymenter database
3. Clear Paymenter cache: `php artisan optimize:clear`
4. Verify checkout URL returns 200

---

## Fix 3: Fix Valheim Checkout Redirect (MEDIUM) — Issue #44

**Problem:** Valheim is the only single-tier product without ConfigOptions. Its checkout URL redirects to `/cart` (empty). All 15 other games with ConfigOptions work correctly.

**Options (pick one):**
- **Option A (Recommended):** Add a ConfigOption to Valheim matching the other games — parent "Server Plan" with one child "6GB RAM - $14.99"
- **Option B:** Investigate Paymenter's checkout routing for single-plan products to understand why it redirects

**Implementation (Option A):**
1. In Paymenter admin, go to Products > Valheim
2. Add ConfigOption parent: name="Server Plan", env_variable="memory", type="select"
3. Add ConfigOption child: name="6GB RAM - 10 Players", env_variable="6144", with plan at $14.99/month recurring
4. Set the base product plan to "free" type (matching all other games)
5. Verify checkout URL works

---

## Fix 4: Standardize Refund URL (MEDIUM) — Issue #40

**Problem:** Astro footer links to `/refund`, billing theme footer links to `/refunds` (with 's').

**Implementation:**
1. Standardize on `/refund` (singular, matching common convention)
2. In `themes/pocketburrito/views/components/navigation/footer.blade.php` line 56:
   - Change `https://pocketburrito.ca/refunds` to `https://pocketburrito.ca/refund`
3. Deploy theme to server

---

## Fix 5: Remove Twitter Link (MEDIUM) — Issue #41

**Problem:** Billing theme footer has a Twitter link to `https://twitter.com/pocketburrito` but no Twitter account exists. Astro site already removed this link.

**Implementation:**
1. In `themes/pocketburrito/views/components/navigation/footer.blade.php` lines 17-19:
   - Remove the entire Twitter `<a>` element and its SVG icon
2. Deploy theme to server

---

## Fix 6: Unify Color Scheme (MEDIUM) — New

**Problem:** The two sites use different background colors, border colors, and accent gradients, making them feel like separate products.

### Current Color Differences

| Element | Astro (pocketburrito.ca) | Paymenter (billing) | Target |
|---------|--------------------------|---------------------|--------|
| Body background | `#050810` (gaming-darker) | `#0a0a1f` (dark-background) | `#050810` |
| Nav background | `#0a0e1a` at 95% (gaming-dark) | `#0a0a1f` at 95% | `#0a0e1a` at 95% |
| Card/section bg | `#0a0e1a` (gaming-dark) | `#13132b` (dark-bg-secondary) | `#0a0e1a` |
| Nav border | `gray-800` (#1f2937) | `#8b5cf6` at 20% | `gray-800` |
| Footer background | `#0a0e1a` | `#0a0a1f` | `#0a0e1a` |
| Logo gradient | `#6366f1` → `#8b5cf6` (indigo→purple) | `#8b5cf6` → `#ec4899` (purple→pink) | `#6366f1` → `#8b5cf6` |
| Accent color | `#6366f1` (indigo) | `#8b5cf6` (purple) | `#6366f1` primary, `#8b5cf6` secondary |
| Link hover | white | `#8b5cf6` (purple) | white |

### Decision: Astro site is the source of truth

The Astro site is the public-facing brand. The Paymenter theme should match it, not the other way around.

### Changes to Paymenter theme (`theme.php`):

```php
// Dark mode colors to match Astro
'dark-background'           => '#050810',  // was #0a0a1f — match gaming-darker
'dark-background-secondary' => '#0a0e1a',  // was #13132b — match gaming-dark
'dark-neutral'              => '#1f2937',  // was #2d2d4a — match gray-800
'dark-primary'              => '#6366f1',  // was #8b5cf6 — match gaming-accent
'dark-secondary'            => '#8b5cf6',  // was #ec4899 — match gaming-purple
```

### Changes to Paymenter nav (`navigation/index.blade.php`):

1. **Background:** Change `bg-[#0a0a1f]/95` → `bg-[#0a0e1a]/95`
2. **Border:** Change `border-[#8b5cf6]/20` → `border-[#1f2937]` (gray-800)
3. **Backdrop blur:** Change `backdrop-blur-xl` → `backdrop-blur-sm` (match Astro)
4. **Logo gradient:** Change `from-[#8b5cf6] to-[#ec4899]` → `from-[#6366f1] to-[#8b5cf6]`
5. **Logo text size:** Change `text-lg` → `text-xl`
6. **Nav height:** Change `h-14` → `h-16` (and update `top-14` offset → `top-16`)
7. **Link text color:** Change `text-gray-100` → `text-gray-300` (match Astro)
8. **Link text size:** Change `text-sm font-medium` → remove text-sm (use default base size)
9. **Order Now button:** Change `bg-primary rounded-full` → `bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-lg`
10. **Mobile menu background:** Change `bg-[#0a0a1f]` → `bg-[#0a0e1a]`

### Changes to Paymenter footer (`footer.blade.php`):

1. **Max width:** Change `max-w-[1400px]` → `max-w-7xl` (1280px, match Astro)
2. **Border:** Uses CSS variable `border-neutral/30` — will update automatically via theme.php
3. **Link hover:** Change `hover:text-primary` → `hover:text-white` (match Astro)
4. **Brand column:** Change `md:col-span-1` → `col-span-1 md:col-span-2` (match Astro's wider brand column)
5. **Logo gradient:** Change `from-[#8b5cf6] to-[#ec4899]` → `from-[#6366f1] to-[#8b5cf6]`

### Changes to other Paymenter templates (home.blade.php, etc.):

Search and replace all hardcoded color references:
- `#0a0a1f` → `#050810` (body backgrounds)
- `#13132b` → `#0a0e1a` (card backgrounds)
- `from-[#8b5cf6] to-[#ec4899]` → `from-[#6366f1] to-[#8b5cf6]` (logo gradients)

### Font unification:

Add Rajdhani font to the Paymenter theme's `app.blade.php`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Rajdhani:wght@600;700&display=swap" rel="stylesheet">
```

---

## Fix 7: Unify Navigation Bar Structure (MEDIUM) — New

**Problem:** The nav bars differ in height, z-index, max-width, and link structure. The Paymenter nav has a "Shop" dropdown and different button styles.

### Changes to Paymenter nav:

1. **Max width:** Change `max-w-[1400px]` → `max-w-7xl`
2. **Z-index:** Change `z-20` → `z-50`
3. **Remove Shop dropdown:** The nginx redirects already handle routing product browsing to the Astro site. The Shop dropdown in the billing nav is redundant and confusing.
4. **Add logo image:** The Astro nav has the PocketBurrito logo image next to the text. Add the same to the Paymenter nav: `<img src="/pocketburrito/assets/logo.png" class="h-20 w-auto rounded-lg" />`
5. **Match link order exactly:**
   - Home | Games | Pricing | Docs | Panel Login | [Order Now button]
   - (When logged in: add Cart, Notifications, Avatar dropdown after Panel Login)

### Content max-width alignment:

Update `max-w-[1400px]` → `max-w-7xl` in:
- `navigation/index.blade.php`
- `navigation/footer.blade.php`
- `layouts/app.blade.php` (main content wrapper)

---

## Fix 8: Add Tickets & Services Links (MEDIUM) — New

**Problem:** There is no way for logged-in users to access their support tickets or view/cancel their services from the nav bar or any obvious location. The ticket link is only in the billing footer (behind `@auth`), and services have no visible link at all outside the panel.

### Changes needed:

#### A. Add to Paymenter nav (logged-in user dropdown):
The account dropdown already pulls links from `Navigation::getAccountDropdownLinks()` which likely includes Services and Tickets. Verify these routes exist:
- `/services` — View my services (with cancel option)
- `/tickets` — View my tickets
- `/tickets/create` — Create new ticket

If not in the dropdown, add them manually:
```blade
<a href="/services" wire:navigate class="block px-3 py-2 text-sm text-base hover:text-primary transition-colors">
    My Services
</a>
<a href="/tickets" wire:navigate class="block px-3 py-2 text-sm text-base hover:text-primary transition-colors">
    Support Tickets
</a>
```

#### B. Add to Astro site nav (for logged-in flow):
Add a "My Account" or "Client Area" link to the Astro nav that points to `https://billing.pocketburrito.ca/services`:
```html
<a href="https://billing.pocketburrito.ca" class="text-gray-300 hover:text-white transition">My Account</a>
```

#### C. Add "My Services" and "Support" to Astro footer:
Under Quick Links, add:
```html
<li><a href="https://billing.pocketburrito.ca/services" class="text-gray-400 hover:text-white transition">My Services</a></li>
<li><a href="https://billing.pocketburrito.ca/tickets/create" class="text-gray-400 hover:text-white transition">Support Tickets</a></li>
```

#### D. Add Support section to Astro footer (matching billing theme):
Add a "Support" column to the Astro footer to match the billing theme footer:
```html
<div>
    <h3 class="font-semibold text-white mb-4">Support</h3>
    <ul class="space-y-2">
        <li><a href="https://billing.pocketburrito.ca/tickets/create" class="text-gray-400 hover:text-white transition">Submit Ticket</a></li>
        <li><a href="/docs" class="text-gray-400 hover:text-white transition">Knowledge Base</a></li>
        <li><a href="https://panel.pocketburrito.ca" class="text-gray-400 hover:text-white transition">Control Panel</a></li>
        <li><a href="https://discord.gg/gjjGWYY7" class="text-gray-400 hover:text-white transition">Discord Community</a></li>
    </ul>
</div>
```

---

## Fix 9: Update LINK_MAPPING.md (LOW) — Issue #42

**Problem:** Documentation references old URL patterns.

**Implementation:**
1. In `docs/maintenance/LINK_MAPPING.md` lines 61-62:
   - Change `https://billing.pocketburrito.ca/order/{slug}` → `https://billing.pocketburrito.ca/products/game-servers/{slug}/checkout`
   - Remove the tier-specific URL pattern (tiers are selected on the checkout page via ConfigOption dropdown)
2. Update any other outdated references

---

## Fix 10: Fix Discord Link in Billing Theme (LOW)

**Problem:** Billing theme footer uses `https://discord.gg/pocketburrito` but Astro site uses `https://discord.gg/gjjGWYY7` (the actual invite link).

**Implementation:**
1. In `themes/pocketburrito/views/components/navigation/footer.blade.php` lines 20 and 46:
   - Change `https://discord.gg/pocketburrito` → `https://discord.gg/gjjGWYY7`

---

## Implementation Order

### Batch 1: Critical Fixes (deploy immediately)
1. Fix ARK slug mismatch (database change on server)
2. Fix Valheim checkout (add ConfigOption in admin panel)

### Batch 2: Legal Pages (Astro deploy)
3. Create terms.astro, privacy.astro, refund.astro
4. Fix refund URL mismatch (change billing theme to /refund)
5. Add Support section to Astro footer + tickets/services links

### Batch 3: Visual Unification (theme deploy)
6. Update theme.php color defaults
7. Update nav bar (colors, height, structure, logo, links)
8. Update footer (colors, layout, Discord link, remove Twitter)
9. Update all hardcoded colors in other Blade templates
10. Add Rajdhani font to theme
11. Deploy theme to server

### Batch 4: Documentation Cleanup
12. Update LINK_MAPPING.md
13. Update PROJECT_STATUS.md with session 4 results

---

## Files Modified Per Batch

### Batch 1 (Server)
- Paymenter database: `products` table (ARK slug)
- Paymenter admin: Valheim product ConfigOption

### Batch 2 (Astro - push to main)
- `src/pages/terms.astro` (new)
- `src/pages/privacy.astro` (new)
- `src/pages/refund.astro` (new)
- `src/layouts/Layout.astro` (footer: add Support section, tickets/services links)

### Batch 3 (Paymenter theme - deploy to server)
- `themes/pocketburrito/theme.php` (color defaults)
- `themes/pocketburrito/views/components/navigation/index.blade.php` (nav bar)
- `themes/pocketburrito/views/components/navigation/footer.blade.php` (footer)
- `themes/pocketburrito/views/layouts/app.blade.php` (font, max-width)
- `themes/pocketburrito/views/home.blade.php` (hardcoded colors)
- Any other Blade templates with hardcoded color values

### Batch 4 (Docs - push to main)
- `docs/maintenance/LINK_MAPPING.md`
- `docs/PROJECT_STATUS.md`

---

## Verification Checklist

After all fixes are deployed:

- [ ] /terms, /privacy, /refund show correct legal content
- [ ] ARK checkout URL returns 200 and shows checkout page
- [ ] Valheim checkout URL returns 200 and shows checkout page
- [ ] Both sites use identical nav bar appearance (color, height, links, logo)
- [ ] Both sites use identical footer structure (columns, links, Discord)
- [ ] Body background color matches across both sites
- [ ] Logo gradient matches across both sites (indigo → purple)
- [ ] No Twitter link on either site
- [ ] Refund link is `/refund` on both sites
- [ ] Logged-in users can access Services and Tickets from billing nav
- [ ] Astro footer has Support section with ticket/services links
- [ ] Discord invite link is consistent (`discord.gg/gjjGWYY7`) across both sites
- [ ] All 16 checkout URLs return 200
- [ ] Rajdhani font loads on billing site
