# User Workflow: Login

## Overview
Existing user logs into their PocketBurrito billing account (Paymenter).

## Entry Point
- **URL:** https://billing.pocketburrito.ca/login
- **From:** Navigation links, "Order Now" (if not logged in), or direct URL

## Form Fields
| Field | Type | Notes |
|-------|------|-------|
| Email | Email | Required |
| Password | Password | Required, masked |
| Remember me | Checkbox | Optional, extends session |

## Additional Links on Page
- "Forgot your password?" -> https://billing.pocketburrito.ca/password/request
- "Don't have an account? Sign in" -> https://billing.pocketburrito.ca/register

## Steps

### 1. Navigate to Login
- User visits https://billing.pocketburrito.ca/login
- PocketBurrito-themed login form displays

### 2. Enter Credentials
- Type email address
- Type password
- Optionally check "Remember me"

### 3. Submit Login
- Click "Sign in" button
- Credentials validated against Paymenter database

### 4. Post-Login
- Session created
- Redirected to billing dashboard or intended page
- Navigation updates to show logged-in state
- Can access: My Services, Invoices, Tickets, Profile

## Authentication States

### Success
- Session cookie set
- Redirect to dashboard (https://billing.pocketburrito.ca/dashboard or similar)
- Access to all authenticated pages

### Failure - Invalid Credentials
- Error message displayed
- Password field cleared
- Email retained

### Failure - Account Issues
- If account disabled/suspended: appropriate error message

## Security Features
- HTTPS only (SSL via Cloudflare + Let's Encrypt)
- CSRF token on form
- Session management via Paymenter/Laravel
- Cloudflare proxy provides additional DDoS protection

## Success Criteria
- Valid credentials accepted
- Session established
- User redirected to dashboard
- Protected pages accessible
- Navigation reflects logged-in state

## Related Workflows
- [01-user-registration.md](01-user-registration.md)
- [11-password-reset.md](11-password-reset.md)
- [03-browse-products.md](03-browse-products.md)

## Test Scenarios
1. **Happy Path:** Valid email + password -> Login success, dashboard shown
2. **Wrong Password:** Valid email, wrong password -> Error message
3. **Unknown Email:** Non-existent email -> Error message
4. **Empty Fields:** Submit blank form -> Validation errors
5. **Remember Me:** Check remember me -> Session persists after browser close
6. **Post-Login Redirect:** Access protected page while logged out -> Login -> Redirect back

---
**Status:** Documented | Testing Pending
