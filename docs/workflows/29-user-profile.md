# User Workflow: Manage Profile and Billing Details

## Overview
Customer manages their personal profile information and billing details through the Paymenter billing portal, including updating contact information, changing password, and managing payment methods.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/profile (or account settings)
- **From:** User avatar/dropdown menu in the top-right navigation, clicking "Profile" or "Account"

## Prerequisites
- User is logged into https://billing.pocketburrito.ca

## Steps

### 1. Navigate to Profile
- Click the user avatar or name in the top-right navigation bar
- Select "Profile", "Account", or "My Details" from the dropdown
- The profile management page loads

### 2. View Current Information
- The profile page displays current account details:
  - First Name and Last Name
  - Email address
  - Phone number
  - Company name (optional)
  - Address (line 1 and line 2)
  - City, State/Province, ZIP/Postal Code
  - Country

### 3. Update Personal Information
- Edit any of the following fields:
  - Name, phone, company name
  - Address fields
  - City, state, ZIP, country
- Click "Save" or "Update Profile"
- Changes are persisted immediately
- Updated information is used on future invoices

### 4. Change Email Address
- Edit the email field
- Some systems require email verification for the new address
- If verification is required:
  - A verification email is sent to the new address
  - Click the verification link to confirm
  - Email updates after verification
- If no verification: email changes immediately

### 5. Change Password
- Navigate to the password section (may be on the same page or a separate "Security" tab)
- Enter the current password
- Enter the new password
- Confirm the new password
- Click "Change Password" or "Update Password"
- The new password takes effect immediately for future logins
- Current session may or may not be invalidated

### 6. Manage Payment Methods (If Supported)
- Navigate to the payment methods section
- View saved payment methods (credit cards, PayPal, etc.)
- **Add a Payment Method:** Enter new card details or link a payment account
- **Remove a Payment Method:** Delete a saved method
- **Set Default:** Choose which payment method is used for automatic renewals
- Availability depends on the configured payment gateway

### 7. View Account Activity
- Some profiles show:
  - Last login date and IP
  - Account creation date
  - Recent actions or login history

## Error Cases

### Email Already in Use
- Changing email to one already registered by another user
- Error message displayed; change rejected

### Current Password Incorrect
- Entering wrong current password when changing password
- Error message; password not changed

### Invalid Phone or Address
- Entering invalid format for phone or address fields
- Validation error displayed

### Payment Method Declined
- Adding a credit card that fails validation or authorization
- Error from payment gateway displayed

## Success Criteria
- Profile information can be viewed and updated
- Updated information persists and appears on future invoices
- Password change works and the new password is usable immediately
- Email change (with or without verification) updates the account email
- Payment methods can be added, removed, and set as default
- All changes are reflected in admin view as well

## Related Workflows
- [01-user-registration.md](01-user-registration.md)
- [02-user-login.md](02-user-login.md)
- [11-password-reset.md](11-password-reset.md)
- [18-view-invoices.md](18-view-invoices.md)

## Test Scenarios
1. **View Profile:** Navigate to profile -> All current details displayed correctly
2. **Update Name:** Change last name -> Save -> New name reflected in profile and invoices
3. **Update Address:** Change address -> Save -> New address on next invoice
4. **Update Phone:** Change phone number -> Save -> Persisted
5. **Change Email:** Change to a new valid email -> Email updated (after verification if required)
6. **Duplicate Email:** Change to existing user's email -> Error shown
7. **Change Password:** Enter current + new password -> Save -> Log out -> Log in with new password
8. **Wrong Current Password:** Enter incorrect current password -> Error, password unchanged
9. **Password Mismatch:** New password and confirm password differ -> Validation error
10. **Add Payment Method:** Add a credit card -> Card saved and available for future payments
11. **Remove Payment Method:** Remove a saved card -> Card no longer listed
12. **Admin View:** Admin views user profile -> Sees updated information

---
**Status:** Documented | Testing Pending
