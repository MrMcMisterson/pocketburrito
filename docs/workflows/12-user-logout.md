# User Workflow: User Logout

## Overview
Customer logs out of the billing portal (Paymenter) and/or the game panel (Pterodactyl), ending their authenticated session.

## Entry Points

### Billing Portal (Paymenter)
- **URL:** https://billing.pocketburrito.ca/logout (or via navigation menu)
- **From:** User dropdown menu in the top-right navigation bar

### Game Panel (Pterodactyl)
- **URL:** https://panel.pocketburrito.ca (user menu)
- **From:** User avatar/dropdown in the top-right of the panel interface

## Prerequisites
- User is currently logged into the respective portal

## Steps

### Billing Portal Logout

#### 1. Access Logout Option
- Click the user avatar or username in the top-right navigation bar
- A dropdown menu appears with account options
- Click "Logout" or "Sign Out"

#### 2. Session Terminated
- Paymenter invalidates the user's session token
- User is redirected to the login page at https://billing.pocketburrito.ca/login
- Attempting to access authenticated pages (e.g., `/services`, `/tickets`) redirects to login

### Game Panel Logout

#### 1. Access Logout Option
- Click the user avatar in the top-right corner of the Pterodactyl panel
- A dropdown menu appears
- Click "Sign Out"

#### 2. Session Terminated
- Pterodactyl invalidates the panel session
- User is redirected to the panel login page at https://panel.pocketburrito.ca/auth/login
- Attempting to access server management pages redirects to login

## Important Notes
- Billing and panel sessions are independent; logging out of one does not log out of the other
- If the user has "Remember Me" enabled, the session may persist longer before requiring re-authentication
- Closing the browser tab does not guarantee logout; the session cookie may persist
- For security, users should explicitly log out on shared or public computers

## Error Cases

### Session Already Expired
- If the session has timed out, clicking logout may redirect to login page directly
- No error is shown; the user is simply already logged out

### Network Error During Logout
- If the logout request fails due to network issues, the session may remain active server-side
- The session will eventually expire on its own

## Success Criteria
- User session is invalidated on the server
- User is redirected to the login page
- Accessing protected pages requires re-authentication
- Session cookie is cleared from the browser

## Related Workflows
- [02-user-login.md](02-user-login.md)
- [11-password-reset.md](11-password-reset.md)

## Test Scenarios
1. **Billing Logout:** Click logout on billing -> Redirected to login -> Cannot access /services without logging in
2. **Panel Logout:** Click sign out on panel -> Redirected to panel login -> Cannot access server pages
3. **Independent Sessions:** Log out of billing -> Panel session remains active
4. **Post-Logout Navigation:** After logout, press browser back button -> Page does not show authenticated content (or redirects to login)
5. **Session Expiry:** Leave session idle past timeout -> Next action requires login
6. **Shared Computer:** Log out on shared machine -> Next user cannot access the previous user's account

---
**Status:** Documented | Testing Pending
