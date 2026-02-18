# User Workflow: Shopping Cart Management

## Overview
User manages items in their shopping cart on billing.pocketburrito.ca before completing checkout.

## Note on Paymenter v2 Cart Behavior
Paymenter uses a "direct checkout" model -- when the admin setting `direct_checkout` is enabled, clicking "Order Now" goes straight to checkout rather than adding to a cart first. PocketBurrito has `direct_checkout` enabled in the theme admin settings.

If direct checkout is enabled, the traditional cart flow may be bypassed. This workflow documents the cart behavior for when items are added to cart (e.g., direct_checkout disabled, or multiple items).

## Cart Access
- **URL:** https://billing.pocketburrito.ca/cart (if cart exists)
- **From:** Cart icon in navigation, or after adding product to cart

## Cart Page Elements

### Cart Items
For each item in cart:
- Product name and game icon
- Selected tier/plan (e.g., "Minecraft - 6GB RAM")
- Billing cycle (Monthly/Quarterly/Annual)
- Price per cycle
- Remove button

### Cart Summary
- Subtotal
- Discount (if coupon applied)
- Tax (if applicable)
- Total
- "Proceed to Checkout" button
- Coupon code input field

## Managing Cart

### Add Item
- From product/checkout page, add to cart
- Cart icon updates with item count

### Remove Item
- Click remove/trash icon next to item
- Item removed, totals recalculate
- If last item removed: "Your cart is empty" message

### Edit Item
- Click edit to return to product configuration
- Change tier selection
- Update cart with new selection

### Apply Coupon
- Enter coupon code in field
- Click "Apply"
- Valid: discount shown, total updates
- Invalid: error message displayed

## Empty Cart
- Message: "Your cart is empty"
- Link to browse products
- No checkout button shown

## Cart Persistence
- Logged-in users: cart persists across sessions (stored in DB)
- Guest users: cart stored in session cookie (temporary)
- After login: guest cart should merge with existing cart

## Critical Edge Cases

### Edit First Item After Adding Second
1. Add Minecraft (select 3GB tier)
2. Add Valheim
3. Go to cart
4. Edit Minecraft item
- **Expected:** Returns to Minecraft config with 3GB pre-selected
- **Risk:** May load wrong product config

### Price Changed After Adding to Cart
- Admin updates product price while item is in cart
- **Expected:** Cart shows updated price or notifies user

### Product Disabled After Adding to Cart
- Admin disables product while item is in cart
- **Expected:** Warning shown, item cannot be checked out

## Success Criteria
- Cart displays items correctly
- Prices calculate accurately
- Remove functionality works
- Edit functionality returns to correct product
- Coupon codes apply/reject properly
- Checkout button leads to payment

## Related Workflows
- [03-browse-products.md](03-browse-products.md)
- [04-checkout.md](04-checkout.md)

## Test Scenarios
1. **Add Single Item:** Add Minecraft 6GB -> Cart shows correct item and $12.99
2. **Add Multiple Items:** Add Minecraft + Valheim -> Cart shows both, totals correct
3. **Remove Item:** Remove Minecraft from cart -> Only Valheim remains
4. **Edit Item:** Change Minecraft from 6GB ($12.99) to 16GB ($32.99) -> Price updates
5. **Empty Cart:** Remove all items -> "Cart is empty" message, no checkout
6. **Apply Valid Coupon:** Enter valid code -> Discount applied
7. **Apply Invalid Coupon:** Enter "FAKE123" -> Error message
8. **Direct Checkout Mode:** With direct_checkout enabled, "Order Now" skips cart
9. **Cart Persistence:** Add items -> Logout -> Login -> Items still in cart
10. **Critical Edit Test:** Add Minecraft (no tier) -> Add Valheim -> Edit Minecraft -> Correct product loads

---
**Status:** Documented | Critical Testing Required
