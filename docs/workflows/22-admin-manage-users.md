# Admin Workflow: Manage User Accounts

## Overview
Admin manages customer user accounts in the Paymenter admin panel, including viewing user details, editing profiles, resetting passwords, and handling account issues.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/admin/users (or similar admin route)
- **From:** Paymenter admin sidebar under "Users" or "Clients"

## Prerequisites
- Admin is logged into https://billing.pocketburrito.ca/admin

## Steps

### 1. Navigate to Users
- Click "Users" or "Clients" in the admin sidebar
- The user list displays all registered accounts

### 2. View User List
- Each user entry shows:
  - User ID
  - Full name
  - Email address
  - Registration date
  - Number of active services
  - Account status (Active, Disabled)
- Search by name, email, or user ID
- Sort by registration date, name, or number of services

### 3. View User Details
- Click on a user to open their profile
- Details include:
  - Personal information (name, email, phone, address)
  - Account status
  - Registration and last login dates
  - List of services owned by the user
  - List of invoices
  - Ticket history
  - Pterodactyl account link (if applicable)

### 4. Edit User Profile
- On the user detail page, click "Edit" or modify fields directly
- Editable fields:
  - Name, email, phone, address
  - Company name
  - Country, state, city, ZIP
- Save changes
- Changes reflect in the customer's profile

### 5. Reset User Password
- On the user detail page, find the password section
- Click "Reset Password" or set a new password manually
- If reset link: an email is sent to the user with a reset link
- If manual: enter a new password directly (user should be informed to change it)

### 6. Disable/Enable Account
- Toggle the account status to disabled
- Disabled accounts cannot log in to the billing portal
- Active services may continue running unless separately suspended
- Enable the account to restore login access

### 7. Delete User Account
- Click "Delete" on the user detail page
- Confirm deletion
- This action may require all services to be terminated first
- User data is permanently removed (depending on data retention settings)

### 8. Create User Account
- Click "Create User" or "Add Client" button
- Fill in required fields (name, email, password, etc.)
- The account is created and the user can log in immediately
- Useful for manually onboarding customers

## Error Cases

### Email Already Exists
- Changing a user's email to one already in use
- Error displayed, change rejected

### Delete User with Active Services
- Attempting to delete a user who has active services
- May be blocked or require confirmation
- Services should be terminated first

### Pterodactyl Account Mismatch
- User exists in Paymenter but not in Pterodactyl (or vice versa)
- Admin must manually create or link the Pterodactyl account

## Success Criteria
- All users are visible and searchable in the admin panel
- User profiles display accurate information
- Profile edits persist and reflect in the customer's view
- Password reset enables the user to regain access
- Account disable/enable correctly controls login access
- User deletion removes the account as expected

## Related Workflows
- [01-user-registration.md](01-user-registration.md)
- [20-admin-manage-services.md](20-admin-manage-services.md)
- [21-admin-manage-invoices.md](21-admin-manage-invoices.md)
- [29-user-profile.md](29-user-profile.md)

## Test Scenarios
1. **View All Users:** Navigate to users -> All registered accounts listed
2. **Search User:** Search by email -> Matching user found
3. **View User Detail:** Click user -> Full profile with services, invoices, tickets
4. **Edit Profile:** Change user phone number -> Save -> New number persisted
5. **Reset Password:** Send reset link -> User receives email and can reset
6. **Manual Password:** Set new password directly -> User can log in with new password
7. **Disable Account:** Disable a user -> User cannot log in
8. **Enable Account:** Re-enable a disabled user -> User can log in again
9. **Create User:** Create a new user account -> User appears in list and can log in
10. **Delete User:** Terminate services, then delete user -> User removed from list

---
**Status:** Documented | Testing Pending
