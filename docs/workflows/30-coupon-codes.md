# User & Admin Workflow: Coupon/Promo Codes

## Overview
Customers apply coupon or promotional codes during checkout to receive discounts. Admins create and manage coupon codes in the Paymenter admin panel.

## Entry Points

### Customer (Apply Coupon)
- **URL:** Checkout page at https://billing.pocketburrito.ca/products/game-servers/{slug}/checkout
- **From:** Coupon/promo code field during the checkout process

### Admin (Manage Coupons)
- **URL:** https://billing.pocketburrito.ca/admin/coupons (or similar admin route)
- **From:** Paymenter admin sidebar under "Coupons", "Promotions", or "Marketing"

## Customer Workflow: Applying a Coupon

### Steps

#### 1. Proceed to Checkout
- Browse games at https://pocketburrito.ca/games
- Select a game and plan tier
- Navigate to the checkout page on https://billing.pocketburrito.ca

#### 2. Enter Coupon Code
- Locate the "Coupon Code" or "Promo Code" input field on the checkout page
- Enter the coupon code (e.g., `LAUNCH20`, `SUMMER10`)
- Click "Apply" or press Enter

#### 3. Discount Applied
- The checkout page recalculates the total with the discount
- Discount is shown as a line item or adjustment:
  - Percentage discount: e.g., "20% off - $2.60"
  - Fixed amount discount: e.g., "$5.00 off"
- The new total reflects the discounted price

#### 4. Complete Checkout
- Proceed with payment at the discounted price
- The invoice reflects the coupon discount
- Service is provisioned normally

### Error Cases (Customer)

#### Invalid Coupon Code
- Code does not exist or is misspelled
- Error message: "Invalid coupon code" or similar
- No discount applied

#### Expired Coupon
- Code has passed its expiration date
- Error message indicating the coupon has expired

#### Usage Limit Reached
- Coupon has been used the maximum number of times (global or per-user limit)
- Error message indicating the coupon is no longer available

#### Product Restriction
- Coupon is valid only for specific products and does not apply to the selected product
- Error message or coupon field does not reduce the price

#### Minimum Amount Not Met
- Coupon requires a minimum order amount that is not met
- Error message indicating the minimum requirement

## Admin Workflow: Managing Coupons

### Steps

#### 1. Navigate to Coupons
- Log in to https://billing.pocketburrito.ca/admin
- Click "Coupons" or "Promotions" in the admin sidebar

#### 2. View Existing Coupons
- List of all coupons showing:
  - Coupon code
  - Discount type and amount
  - Status (active/expired/disabled)
  - Usage count vs. limit
  - Expiration date

#### 3. Create a New Coupon
- Click "Create Coupon" or "Add Coupon"
- Configure the coupon:
  - **Code:** The text string customers enter (e.g., `LAUNCH20`)
  - **Discount Type:** Percentage or Fixed Amount
  - **Discount Value:** The percentage (e.g., 20) or fixed amount (e.g., 5.00)
  - **Applicable Products:** All products, or select specific products/categories
  - **Usage Limit (Global):** Maximum total uses across all customers (0 = unlimited)
  - **Usage Limit (Per User):** Maximum uses per individual customer
  - **Start Date:** When the coupon becomes active (optional)
  - **Expiration Date:** When the coupon expires (optional)
  - **Recurring:** Whether the discount applies to renewals or only the first payment
  - **Minimum Order Amount:** Minimum cart value to apply the coupon (optional)
- Save the coupon

#### 4. Edit a Coupon
- Click on an existing coupon
- Modify any settings (discount amount, expiration, limits, etc.)
- Save changes
- Changes affect future uses; previously applied discounts are not retroactively changed

#### 5. Disable/Delete a Coupon
- Toggle the coupon to disabled to stop it from being used without deleting it
- Delete the coupon to remove it permanently
- Existing invoices with the coupon applied are not affected

#### 6. Monitor Coupon Usage
- View usage statistics for each coupon:
  - Total times used
  - Revenue impact (total discount given)
  - Which customers used it
- Useful for tracking promotional campaign effectiveness

### Common Coupon Strategies
| Code | Type | Value | Use Case |
|------|------|-------|----------|
| `LAUNCH20` | Percentage | 20% | Launch promotion |
| `WELCOME5` | Fixed | $5.00 | New customer first order |
| `SUMMER10` | Percentage | 10% | Seasonal sale |
| `FRIEND25` | Percentage | 25% | Referral discount, 1 use per user |
| `MINECRAFT50` | Percentage | 50% | Product-specific promotion |

## Success Criteria

### Customer
- Valid coupon code applies the correct discount at checkout
- Discounted total is accurate and reflected on the invoice
- Invalid, expired, or used-up coupons show appropriate error messages
- Service is provisioned normally regardless of discount

### Admin
- Coupons can be created with all configuration options
- Coupon usage is tracked accurately
- Expiration and usage limits are enforced
- Coupons can be edited, disabled, and deleted
- Product restrictions work correctly

## Related Workflows
- [03-browse-products.md](03-browse-products.md)
- [04-checkout.md](04-checkout.md)
- [18-view-invoices.md](18-view-invoices.md)
- [21-admin-manage-invoices.md](21-admin-manage-invoices.md)
- [23-admin-manage-products.md](23-admin-manage-products.md)

## Test Scenarios
1. **Apply Valid Coupon:** Enter `LAUNCH20` at checkout -> 20% discount applied -> Correct total shown
2. **Apply Fixed Coupon:** Enter `WELCOME5` -> $5 off the total -> Invoice reflects discount
3. **Invalid Code:** Enter `NOTACODE` -> Error message -> No discount
4. **Expired Coupon:** Enter expired code -> Error message -> No discount
5. **Usage Limit (Global):** Use a coupon up to its global limit -> Next use rejected
6. **Usage Limit (Per User):** Use a 1-per-user coupon -> Same user tries again -> Rejected
7. **Product Restriction:** Apply Minecraft-only coupon on Rust checkout -> Rejected or no discount
8. **Recurring Discount:** Apply recurring coupon -> First invoice discounted -> Renewal also discounted
9. **Non-Recurring:** Apply first-payment coupon -> First invoice discounted -> Renewal at full price
10. **Admin Create:** Create a new coupon in admin -> Customer can use it at checkout
11. **Admin Disable:** Disable a coupon -> Customer tries to use it -> Rejected
12. **Admin Usage Stats:** Create coupon, customers use it -> Usage count updates in admin

---
**Status:** Documented | Testing Pending
