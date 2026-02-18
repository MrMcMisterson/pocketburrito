# User Workflow: View My Servers

## Overview
Customer views their active game servers and accesses server management through the Pterodactyl panel.

## Access Points

### From Paymenter (Billing)
- **URL:** https://billing.pocketburrito.ca/services (or similar)
- Shows list of active services with status
- Each service links to Pterodactyl panel for management

### From Pterodactyl Panel (Direct)
- **URL:** https://panel.pocketburrito.ca
- Login with same credentials or linked account
- Dashboard shows all servers

## Paymenter Services View

### Service List
For each active service:
- Game name and plan tier
- Status: Active / Pending / Suspended / Cancelled
- Server IP and port
- Billing cycle and next due date
- "Manage" button -> Opens Pterodactyl panel for that server

### Service Detail
- Full product details
- Billing information
- Server connection details
- Link to cancel/upgrade (if available)
- Link to open support ticket

## Pterodactyl Panel Dashboard

### Login
- URL: https://panel.pocketburrito.ca
- Uses panel credentials (may differ from billing credentials)
- Custom PocketBurrito branding (purple theme, reCAPTCHA)

### Server List
- All servers owned by user displayed as cards
- Each card shows:
  - Server name
  - Game type (via egg)
  - Status (Running / Stopped / Installing / Error)
  - Resource usage (CPU, RAM)
  - IP:Port for connection
  - Quick actions (Start, Stop, Restart)

### Server Management
Clicking a server opens full management interface:
- **Console:** Live server console with command input
- **Files:** File manager for server files (config, worlds, plugins)
- **Databases:** MySQL database management
- **Backups:** Create and restore backups
- **Schedules:** Automated tasks (restart, backup schedule)
- **Users:** Sub-users with permission management
- **Network:** Port allocations
- **Settings:** Server name, reinstall, startup parameters

## Success Criteria
- Customer can see all their servers
- Server status accurately reflects actual state
- Server IP/port correct and connectable
- All management tabs functional
- Console shows live output
- File manager works

## Related Workflows
- [06-server-provisioning.md](06-server-provisioning.md)
- [08-server-console.md](08-server-console.md)
- [09-server-file-manager.md](09-server-file-manager.md)
- [10-server-databases.md](10-server-databases.md)

## Test Scenarios
1. **View Servers After Purchase:** Complete checkout -> Server appears in list
2. **Server Status Accurate:** Running server shows "Running"
3. **Connection Details:** IP:Port matches actual server
4. **Manage Server Link:** Click "Manage" -> Opens Pterodactyl interface
5. **Multiple Servers:** User with 2+ servers sees all of them
6. **Empty State:** New user with no servers -> Appropriate message

---
**Status:** Documented | Testing Pending
