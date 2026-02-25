# User Workflow: Password Reset

## Overview
Customer resets their forgotten password for the billing portal (Paymenter) via the password reset flow.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/password/request
- **From:** Login page link "Forgot your password?" or direct navigation

## Prerequisites
- User has an existing account on https://billing.pocketburrito.ca
- User has access to the email address associated with their account
- Paymenter mail configuration is functional (SMTP configured in `.env`)

## Steps

### 1. Navigate to Password Reset Page
- From the login page at https://billing.pocketburrito.ca/login, click "Forgot your password?"
- Alternatively, navigate directly to https://billing.pocketburrito.ca/password/request
- The password reset request form is displayed

### 2. Submit Email Address
- Enter the email address associated with the account
- Click the "Send Password Reset Link" button
- Paymenter validates the email exists in the database
- If valid, a password reset email is queued

### 3. Check Email
- Open the email inbox for the submitted address
- Look for an email from PocketBurrito (sender configured in Paymenter)
- The email contains a password reset link with a unique token
- The token is valid for a limited time (typically 60 minutes)

### 4. Click Reset Link
- Click the password reset link in the email
- The link navigates to https://billing.pocketburrito.ca/password/reset/{token}
- A form is displayed with fields for new password

### 5. Set New Password
- Enter the email address (may be pre-filled)
- Enter the new password
- Confirm the new password
- Click "Reset Password"
- Paymenter validates the token and updates the password

### 6. Post-Reset
- Success message is displayed
- User is redirected to the login page
- User can now log in with the new password
- The reset token is invalidated and cannot be reused

## Error Cases

### Email Not Found
- If the email is not associated with any account, Paymenter may still show a success message (to prevent email enumeration) or show an error
- No email is sent if the account does not exist

### Expired Token
- If the user clicks the reset link after the token has expired
- Error message: "This password reset token is invalid" or similar
- User must request a new reset link

### Password Validation Failure
- New password does not meet minimum length or complexity requirements
- Error displayed on the reset form
- User must enter a compliant password

### Email Delivery Issues
- Reset email may be delayed or caught by spam filters
- User should check spam/junk folder
- If email never arrives, user should contact support via https://billing.pocketburrito.ca/tickets/create

## Important Notes
- This resets the Paymenter (billing) password only
- Pterodactyl panel credentials are separate; if the user has different panel credentials, those must be reset at https://panel.pocketburrito.ca/auth/password
- If accounts are linked, the behavior depends on SSO configuration

## Success Criteria
- Password reset email is sent within a few minutes
- Reset link opens a valid password change form
- New password is saved and the user can log in with it
- Old password no longer works after reset
- Reset token is single-use and expires appropriately

## Related Workflows
- [02-user-login.md](02-user-login.md)
- [01-user-registration.md](01-user-registration.md)
- [12-user-logout.md](12-user-logout.md)
- [29-user-profile.md](29-user-profile.md)

## Test Scenarios
1. **Happy Path:** Enter valid email -> Receive email -> Click link -> Set new password -> Login with new password
2. **Invalid Email:** Enter unregistered email -> Appropriate response (no email sent)
3. **Expired Token:** Wait beyond token expiry -> Click link -> Error shown
4. **Reused Token:** Use a reset link twice -> Second attempt fails
5. **Password Mismatch:** Enter different passwords in new/confirm fields -> Validation error
6. **Weak Password:** Enter a short password -> Validation error
7. **Spam Folder:** Check spam folder if email not in inbox
8. **Panel Password Unchanged:** Reset billing password -> Panel password remains the same (if separate)

---
**Status:** Documented | Testing Pending
