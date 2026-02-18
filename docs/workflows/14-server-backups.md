# User Workflow: Server Backups

## Overview
Customer creates and restores backups of their game server data through the Pterodactyl panel. Backups capture server files (world data, configs, plugins) and can be used to recover from data loss or rollback changes.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}/backups
- **From:** "Backups" tab in the server management interface

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has a provisioned server
- Server has a backup limit greater than 0 (configured by admin)
- User (or sub-user) has backup permissions

## Steps

### 1. Navigate to Backups Tab
- Open the server from the Pterodactyl dashboard
- Click the "Backups" tab in the left sidebar
- The page displays existing backups and a "Create Backup" button

### 2. Create a Backup
- Click "Create Backup"
- Optionally enter a name/label for the backup (e.g., "Before plugin update")
- Optionally specify files/directories to exclude (ignored files field)
- Optionally toggle "Lock" to prevent automatic deletion when backup limit is reached
- Click "Start Backup"
- Pterodactyl compresses server files into a `.tar.gz` archive
- Backup progress appears in the list with a status indicator
- Backup creation time depends on server file size (can take seconds to several minutes)

### 3. View Backup Details
- Each backup in the list shows:
  - Backup name
  - Creation date and time
  - File size (compressed)
  - Status: Completed, In Progress, or Failed
  - Checksum for integrity verification
  - Lock status

### 4. Download a Backup
- Click the three-dot menu on a completed backup
- Select "Download"
- A download link is generated (typically valid for a short time)
- The `.tar.gz` archive downloads to the user's local machine
- Useful for offsite storage or local inspection

### 5. Restore a Backup
- Click the three-dot menu on a completed backup
- Select "Restore"
- A confirmation dialog warns that restoring will overwrite current server files
- Optionally choose to delete all current files before restoring
- Confirm the restore
- Pterodactyl extracts the backup archive, replacing server files
- The server should be stopped before restoring for best results

### 6. Delete a Backup
- Click the three-dot menu on a backup
- Select "Delete"
- Confirm deletion
- The backup archive is permanently removed
- Locked backups must be unlocked before deletion

### 7. Lock/Unlock a Backup
- Click the lock icon on a backup to toggle its lock status
- Locked backups are not automatically rotated when the backup limit is reached
- Locked backups must be manually unlocked before they can be deleted

## Error Cases

### Backup Limit Reached
- If the backup limit is reached and all backups are locked, new backups cannot be created
- If unlocked backups exist, the oldest unlocked backup is automatically deleted to make room
- Error message if no space can be freed

### Backup Failed
- Server files may be too large or disk quota exceeded
- Backup status shows "Failed" with an error indicator
- User should check disk usage and try again

### Restore on Running Server
- Restoring while the server is running may cause file conflicts
- Pterodactyl may automatically stop the server before restoring, or warn the user

### Insufficient Disk Space
- If the server disk is nearly full, backup creation may fail
- User should clean up unnecessary files first

## Success Criteria
- Backup is created successfully and shows as "Completed" with correct file size
- Backup can be downloaded as a valid `.tar.gz` archive
- Restoring a backup returns server files to the backed-up state
- Backup rotation respects lock status
- Deleted backups free the slot for new backups

## Related Workflows
- [07-view-my-servers.md](07-view-my-servers.md)
- [09-server-file-manager.md](09-server-file-manager.md)
- [15-server-schedules.md](15-server-schedules.md)
- [28-server-reinstall.md](28-server-reinstall.md)

## Test Scenarios
1. **Create Backup:** Click "Create Backup" -> Backup completes -> Appears in list with size
2. **Named Backup:** Create backup with name "Pre-update" -> Name appears in backup list
3. **Download Backup:** Download a completed backup -> Valid `.tar.gz` file saved locally
4. **Restore Backup:** Make a file change -> Restore earlier backup -> Change is reverted
5. **Restore with Delete:** Restore with "delete all files" option -> Only backup contents remain
6. **Delete Backup:** Delete a backup -> Removed from list -> Slot freed
7. **Backup Limit:** Reach backup limit -> Create new backup -> Oldest unlocked backup auto-deleted
8. **Locked Backup:** Lock a backup -> Attempt delete -> Deletion blocked until unlocked
9. **Failed Backup:** Fill disk to near capacity -> Attempt backup -> Failure reported
10. **Sub-user Access:** Sub-user with backup permissions -> Can create and restore backups

---
**Status:** Documented | Testing Pending
