# User Workflow: Server Reinstall

## Overview
Customer reinstalls their game server through the Pterodactyl panel, which wipes all server files and runs the egg installation script to create a fresh server. This is useful when the server is corrupted, misconfigured beyond repair, or the customer wants a clean start.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}/settings
- **From:** "Settings" tab in the server management interface, "Reinstall Server" section

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has a provisioned server
- User understands that reinstalling will permanently delete all server files

## Steps

### 1. Back Up Important Data
- Before reinstalling, download any files worth keeping:
  - World/save files
  - Plugin configurations
  - Custom scripts or mods
- Create a backup via the Backups tab (see [14-server-backups.md](14-server-backups.md))
- Download the backup to local storage
- Backups stored in Pterodactyl may also be deleted during reinstall (depends on configuration)

### 2. Navigate to Settings
- Open the server from the Pterodactyl dashboard
- Click the "Settings" tab in the left sidebar
- Scroll down to the "Reinstall Server" section

### 3. Initiate Reinstall
- Click "Reinstall Server"
- A confirmation dialog appears with a warning:
  - All server files will be permanently deleted
  - The server will be reset to a fresh installation
  - This action cannot be undone
- Confirm the reinstall

### 4. Reinstall Process
- Server status changes to "Installing"
- The following occurs:
  - All files in the server container are deleted
  - The egg installation script runs (downloads game server files, sets up default configuration)
  - Default startup variables are applied
  - The process takes 1-10 minutes depending on the game
- Console shows installation progress

### 5. Post-Reinstall
- Server status returns to "Offline" (Installed) when complete
- The server is now in a fresh default state:
  - Default configuration files
  - Default world/map (if applicable)
  - No plugins, mods, or customizations
  - Startup variables retain their current values (not reset to defaults)
- Start the server to verify it runs correctly

### 6. Restore Customizations
- Re-upload any plugins, mods, or custom files via the file manager
- Re-apply configuration changes
- Or restore a backup if desired

## What Is Preserved
- **Startup variables:** Current variable values are kept (e.g., server name, version)
- **Database allocations:** Existing databases are not deleted (data in databases persists)
- **Sub-users:** User permissions remain intact
- **Schedules:** Scheduled tasks remain configured
- **Backups:** Existing backups may persist (depending on configuration)
- **Port allocations:** IP and port remain the same

## What Is Deleted
- **All server files:** World data, configs, plugins, mods, logs, everything in `/home/container/`
- **Custom modifications:** Any changes made via the file manager or SFTP

## Error Cases

### Reinstall Fails
- Installation script encounters an error (network issue, download failure)
- Server may be stuck in "Installing" status
- Check console output for error messages
- Admin may need to manually trigger reinstall from Pterodactyl admin

### Accidental Reinstall
- If the user reinstalls without backing up, data is permanently lost
- No undo available
- Contact support, but recovery is not possible

### Server Stuck in Installing
- Installation takes too long or hangs
- Admin should check Wings logs and potentially restart the installation
- Kill the server and try starting again, or contact support

## Success Criteria
- All server files are deleted and replaced with fresh egg defaults
- Server can be started after reinstall and runs correctly
- Startup variables, databases, sub-users, and schedules are preserved
- Installation completes within a reasonable time
- Console shows installation progress and completion

## Related Workflows
- [09-server-file-manager.md](09-server-file-manager.md)
- [14-server-backups.md](14-server-backups.md)
- [16-server-settings.md](16-server-settings.md)
- [13-server-power-controls.md](13-server-power-controls.md)

## Test Scenarios
1. **Reinstall Minecraft:** Reinstall a Minecraft server -> Fresh server.properties and default world -> Starts correctly
2. **Backup Before Reinstall:** Create backup -> Reinstall -> Backup still exists in backup list
3. **Restore After Reinstall:** Reinstall -> Restore backup -> Server returns to pre-reinstall state
4. **Variables Preserved:** Set custom server name variable -> Reinstall -> Variable retains custom value
5. **Databases Preserved:** Create a database -> Reinstall -> Database still exists with data
6. **Sub-users Preserved:** Add sub-user -> Reinstall -> Sub-user still has access
7. **Schedules Preserved:** Create a schedule -> Reinstall -> Schedule still configured
8. **Reinstall Different Game:** Change egg (admin only), then reinstall -> New game installed
9. **Installation Progress:** During reinstall -> Console shows download and setup progress
10. **Failed Installation:** Simulate network failure during install -> Error shown -> Retry succeeds

---
**Status:** Documented | Testing Pending
