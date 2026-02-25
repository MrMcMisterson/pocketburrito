# User Workflow: Registration

## Overview
New customer creates an account on PocketBurrito's billing portal (Paymenter).

## Entry Point
- **URL:** https://billing.pocketburrito.ca/register
- **From:** Login page ("Don't have an account? Sign up") or navigation "Order Now" links

## Form Fields

### Required (marked with *)
| Field | Type | Validation |
|-------|------|------------|
| First Name | Text | Required |
| Last Name | Text | Required |
| Email | Email | Required, unique |
| Password | Password | Required, min length |
| Confirm Password | Password | Must match password |
| Phone | Text | Required |
| Address | Text | Required |
| City | Text | Required |
| State | Text | Required |
| ZIP | Text | Required |
| Country | Dropdown | Required, 249+ countries |

### Optional
| Field | Type |
|-------|------|
| Company Name | Text |
| Address 2 | Text |

## Steps

### 1. Navigate to Registration
- User clicks "Order Now" on pocketburrito.ca or "Sign up" from login page
- Lands on https://billing.pocketburrito.ca/register
- Form displays with PocketBurrito navigation bar

### 2. Fill Registration Form
- All required fields must be completed
- Country defaults to [check default]
- Password field is masked

### 3. Submit Registration
- Click "Sign up" button
- Form validates client-side first
- If valid, submits to Paymenter backend

### 4. Post-Registration
- Account created in Paymenter database
- User logged in automatically
- Redirected to billing dashboard
- Can immediately browse products and checkout

## Error Cases

### Email Already Registered
- Error shown inline or at top of form
- Existing email cannot be reused

### Password Mismatch
- "Confirm Password" doesn't match "Password"
- Error shown before submission

### Missing Required Fields
- Fields highlighted with error styling
- Submission blocked

## Success Criteria
- User account created in Paymenter database
- User session established
- User can access billing dashboard
- User can proceed to order products

## Related Workflows
- [02-user-login.md](02-user-login.md)
- [03-browse-products.md](03-browse-products.md)

## Test Scenarios
1. **Happy Path:** All valid fields -> Account created, redirected to dashboard
2. **Duplicate Email:** Existing email -> Error shown
3. **Password Mismatch:** Different confirm password -> Error
4. **Missing Required Field:** Skip phone -> Validation error
5. **Invalid Email Format:** "notanemail" -> Format error
6. **Empty Form Submit:** Click sign up with nothing filled -> All required fields error

---
**Status:** Documented | Testing Pending
