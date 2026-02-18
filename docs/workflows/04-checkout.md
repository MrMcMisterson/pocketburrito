# User Workflow: Checkout

## Overview
User purchases a game server by completing checkout on billing.pocketburrito.ca. Payment is processed via the configured payment gateway (Stripe/PayPal), and upon successful payment, the server is automatically provisioned via Pterodactyl.

## Entry Point
- **URL Pattern:** `https://billing.pocketburrito.ca/products/game-servers/{slug}/checkout`
- **From:** "Order Now" button on game detail page (pocketburrito.ca/games/{slug})
- **Prerequisite:** User must be logged in. If not, redirected to login first, then back to checkout.

## Steps

### 1. Arrive at Checkout Page
- Paymenter checkout page loads
- Shows product name, description, game image
- For multi-tier games: shows "Server Plan" ConfigOption dropdown

### 2. Select Server Plan (Multi-Tier Games Only)
- Dropdown shows available tiers with RAM and price
- Example (Minecraft):
  - 3GB RAM - $6.99/mo
  - 6GB RAM - $12.99/mo
  - 8GB RAM - $16.99/mo
  - 12GB RAM - $24.99/mo
  - 16GB RAM - $32.99/mo
- Price updates when tier is selected
- **Note:** For Valheim (single-tier), this step is skipped; price is fixed at $14.99/mo

### 3. Select Billing Cycle
- Monthly (default)
- Quarterly (if configured, with discount)
- Annually (if configured, with discount)
- Price updates based on selection

### 4. Review Order Summary
- Product name and selected configuration
- Billing cycle
- Subtotal, tax (if applicable), total
- Coupon/promo code field (if enabled)

### 5. Enter Payment Information
- Payment gateway form (Stripe Elements / PayPal button)
- Credit card: card number, expiry, CVC
- Or PayPal: redirect to PayPal login
- Billing address may be auto-filled from account

### 6. Accept Terms
- Checkbox: "I agree to the Terms of Service"
- Link to Terms of Service page

### 7. Complete Purchase
- Click "Complete Order" / "Pay Now"
- Payment processed via gateway
- Loading indicator shown during processing

### 8. Post-Purchase
- **On Success:**
  - Order confirmation page displayed
  - Order number and receipt shown
  - Invoice created with "Paid" status
  - Server provisioning triggered automatically (see [06-server-provisioning.md](06-server-provisioning.md))
  - Confirmation email sent to customer
  - Server typically ready within 1-5 minutes
- **On Failure:**
  - Payment error displayed (card declined, insufficient funds, etc.)
  - User can retry with different payment method
  - No invoice or server created

## How Server Creation Triggers

1. Payment succeeds -> Invoice marked "Paid" automatically
2. Paymenter detects paid invoice -> triggers server creation job
3. `ExtensionHelper::getServiceProperties()` maps ConfigOption value (RAM) to server settings
4. `Pterodactyl::createServer()` calls Pterodactyl API with:
   - Nest ID and Egg ID from product config
   - Memory from ConfigOption (overrides product base via `array_merge`)
   - Disk, CPU from product settings
   - Auto-assigns to available node allocation
5. Server created and started in Pterodactyl
6. Service status updated to "Active" in Paymenter
7. Customer notification email sent with server details

## Checkout URL Preservation (Nginx)
The nginx config has redirects for browsing pages but **preserves checkout URLs**:
- `billing.pocketburrito.ca/products/game-servers/{slug}/checkout` -> NOT redirected (checkout works on billing)
- `billing.pocketburrito.ca/products/game-servers/{slug}` -> redirected to pocketburrito.ca/games/{slug}

## Error Scenarios

### Payment Declined
- Error message: "Payment failed. Please check your card details."
- Order not created
- User can retry

### Session Expired During Checkout
- Redirect to login
- After login, return to checkout page
- Previous selections may need to be re-entered

### No Plan Selected (Multi-Tier)
- Validation error if user tries to checkout without selecting a tier
- "Please select a server plan" message

### Server Provisioning Fails (After Payment)
- Invoice is "Paid" but Pterodactyl creation fails
- Service status stays "Pending"
- Possible causes: node full, API error, egg misconfigured
- Admin must investigate and manually provision or refund

## Success Criteria
- Checkout page loads with correct product and pricing
- ConfigOption tiers display with correct RAM and prices
- Payment processes successfully
- Invoice created as "Paid"
- Server provisioned automatically in Pterodactyl
- Confirmation email sent
- Server appears in user's "My Servers" within minutes

## Related Workflows
- [03-browse-products.md](03-browse-products.md)
- [05-shopping-cart.md](05-shopping-cart.md)
- [06-server-provisioning.md](06-server-provisioning.md)
- [07-view-my-servers.md](07-view-my-servers.md)

## Test Scenarios
1. **Single-Tier Checkout (Valheim):** Order Now -> Checkout -> Pay -> Server created
2. **Multi-Tier Checkout (Minecraft 3GB):** Select 3GB tier -> Pay $6.99 -> Server created with 3072MB
3. **Multi-Tier Checkout (Minecraft 16GB):** Select 16GB tier -> Pay $32.99 -> Server created with 16384MB
4. **No Plan Selected:** Try checkout without selecting tier -> Error
5. **Payment Declined:** Use test decline card -> Error message, no server created
6. **Checkout While Logged Out:** Access checkout URL -> Redirected to login -> Back to checkout
7. **All 16 Games:** Order each game at lowest tier -> All servers provision correctly
8. **Price Accuracy:** Verify checkout price matches games.ts and Paymenter product config

---
**Status:** Documented | Testing Pending
