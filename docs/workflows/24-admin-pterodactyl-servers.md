# Admin Workflow: Manage Servers in Pterodactyl Admin

## Overview
Admin manages game servers directly through the Pterodactyl admin panel, including viewing server details, modifying resource allocations, managing builds, and troubleshooting server issues.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/admin/servers
- **From:** Pterodactyl admin panel sidebar under "Servers"

## Prerequisites
- Admin is logged into https://panel.pocketburrito.ca/admin
- Pterodactyl admin account with server management permissions

## Infrastructure Context
- **1 Node** (Node 1) running on the Hetzner VPS at `5.78.100.72`
- **10 custom nests** for game categories
- All game servers run as Docker containers managed by Wings

## Steps

### 1. Navigate to Server List
- Log in to https://panel.pocketburrito.ca/admin
- Click "Servers" in the admin sidebar
- The server list displays all servers across all users

### 2. View Server List
- Each server shows:
  - Server ID and UUID
  - Server name
  - Owner (user email)
  - Node assignment
  - Nest and egg
  - Status: Installing, Running, Offline, Suspended
  - Resource allocations (memory, disk, CPU)
- Search by server name, UUID, or owner
- Filter by node, nest, or status

### 3. View Server Details
- Click a server to open the admin detail view
- Tabs include:
  - **About:** Server ID, UUID, name, owner, description, external ID (Paymenter service link)
  - **Build Configuration:** Memory, disk, CPU, swap, IO, database/backup limits, allocations
  - **Startup:** Startup command, Docker image, egg variables
  - **Database:** Server databases
  - **Mounts:** Volume mounts (if configured)
  - **Manage:** Reinstall, suspend, transfer options

### 4. Edit Build Configuration
- Adjust resource limits:
  - **Memory:** RAM allocation in MiB
  - **Disk:** Disk space in MiB
  - **CPU:** CPU limit percentage (100 = 1 core)
  - **Swap:** Swap memory (typically 0 or -1 to disable)
  - **Block IO Weight:** IO priority
  - **Database Limit:** Maximum number of databases
  - **Backup Limit:** Maximum number of backups
  - **Allocation Limit:** Maximum number of port allocations
- Save changes
- Changes take effect after server restart

### 5. Edit Startup Configuration
- Modify the startup command template
- Change the Docker image
- Edit or override egg variables
- Useful for troubleshooting or customizing individual servers

### 6. Manage Server Allocations
- View assigned IP:port allocations
- Change the primary allocation
- Add additional allocations (for games that need multiple ports, e.g., Rust query port)
- Remove unused allocations

### 7. Suspend a Server
- On the Manage tab, click "Suspend Server"
- The server is stopped and the user cannot start it
- Used for overdue payments or policy violations
- See also [26-admin-suspend-service.md](26-admin-suspend-service.md) for Paymenter-initiated suspension

### 8. Unsuspend a Server
- Click "Unsuspend Server"
- User regains the ability to start and manage the server

### 9. Reinstall a Server
- On the Manage tab, click "Reinstall Server"
- The egg installation script re-runs
- All server files are wiped and replaced with fresh egg defaults
- Use when a server is corrupted beyond repair

### 10. Delete a Server
- Click "Delete Server"
- Confirm deletion
- The server container, files, databases, and backups are permanently removed
- The port allocation is freed
- This action cannot be undone

### 11. Transfer a Server (if multi-node)
- Not currently applicable (single node setup)
- Would move the server container to a different node

## Error Cases

### Server Stuck in Installing
- Installation script failed or timed out
- Check the Wings daemon logs on the server
- May need to reinstall or manually fix

### Resource Overallocation
- Assigning more memory than the node has available
- Pterodactyl warns about overallocation based on node settings
- Monitor total resource usage to prevent performance issues

### Port Conflict
- Assigning a port already in use by another server
- Error displayed; choose a different allocation

### Wings Daemon Offline
- Node shows as offline in admin panel
- Servers cannot be started or managed
- SSH into the VPS and check Wings service: `systemctl status wings`

### Orphaned Server
- Server exists in Pterodactyl but has no corresponding Paymenter service
- May result from failed termination; admin should manually clean up

## Success Criteria
- All servers are visible and manageable in the admin panel
- Build configuration changes take effect after restart
- Startup modifications change server behavior correctly
- Suspend/unsuspend correctly controls user access
- Reinstall returns the server to a clean state
- Server deletion completely removes all traces
- Resource allocations match the customer's purchased plan

## Related Workflows
- [06-server-provisioning.md](06-server-provisioning.md)
- [20-admin-manage-services.md](20-admin-manage-services.md)
- [23-admin-manage-products.md](23-admin-manage-products.md)
- [26-admin-suspend-service.md](26-admin-suspend-service.md)
- [27-admin-terminate-service.md](27-admin-terminate-service.md)

## Test Scenarios
1. **View All Servers:** Navigate to admin servers -> All customer servers listed
2. **Search Server:** Search by owner email -> Matching servers displayed
3. **View Details:** Click server -> Full admin details with build, startup, allocations
4. **Edit Memory:** Change server memory from 4096 to 6144 -> Restart -> Server uses 6GB
5. **Edit CPU:** Change CPU limit -> Restart -> New limit applied
6. **Suspend Server:** Suspend a server -> User sees suspended status, cannot start
7. **Unsuspend Server:** Unsuspend -> User can start and manage again
8. **Reinstall Server:** Reinstall -> Server files wiped -> Fresh egg installation
9. **Delete Server:** Delete a server -> Removed from list, files and databases gone
10. **Add Allocation:** Add additional port to server -> Server can bind to new port
11. **Node Offline:** Stop Wings -> Admin panel shows node offline -> Start Wings -> Recovers

---
**Status:** Documented | Testing Pending
