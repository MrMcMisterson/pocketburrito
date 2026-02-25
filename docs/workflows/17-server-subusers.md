# User Workflow: Server Sub-Users

## Overview
Customer adds sub-users to their game server in Pterodactyl, allowing other people (e.g., friends, server admins) to manage the server with granular permissions.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}/users
- **From:** "Users" tab in the server management interface

## Prerequisites
- User is logged into https://panel.pocketburrito.ca as the server owner
- User has a provisioned server
- The person being added must have (or create) a Pterodactyl account at https://panel.pocketburrito.ca

## Steps

### 1. Navigate to Users Tab
- Open the server from the Pterodactyl dashboard
- Click the "Users" tab in the left sidebar
- The page displays current sub-users and a "New User" button

### 2. Add a Sub-User
- Click "New User"
- Enter the email address of the person to add
  - The email must match an existing Pterodactyl account
  - If they do not have an account, they need to register first
- Configure permissions using the permission checkboxes

### 3. Set Permissions
Permissions are organized into categories:

#### Control
- **Console:** View console output and send commands
- **Start:** Start the server
- **Stop:** Stop the server
- **Restart:** Restart the server

#### User
- **Create:** Add new sub-users
- **Read:** View sub-user list
- **Update:** Edit sub-user permissions
- **Delete:** Remove sub-users

#### File
- **Create:** Create new files and directories
- **Read:** View and download files
- **Update:** Edit existing files
- **Delete:** Delete files and directories
- **Archive:** Compress and decompress archives
- **SFTP:** Access files via SFTP

#### Backup
- **Create:** Create new backups
- **Read:** View backup list
- **Delete:** Delete backups
- **Download:** Download backup archives
- **Restore:** Restore from backup

#### Allocation
- **Read:** View port allocations
- **Update:** Change primary allocation

#### Startup
- **Read:** View startup variables
- **Update:** Edit startup variables

#### Database
- **Create:** Create new databases
- **Read:** View database credentials
- **Update:** Rotate passwords
- **Delete:** Delete databases

#### Schedule
- **Create:** Create new schedules
- **Read:** View schedules
- **Update:** Edit schedules
- **Delete:** Delete schedules

### 4. Save Sub-User
- After selecting permissions, click "Invite User" or "Add User"
- The sub-user appears in the users list
- The sub-user can now log into https://panel.pocketburrito.ca and see the server in their dashboard with the assigned permissions

### 5. Edit Sub-User Permissions
- Click on an existing sub-user in the list
- Modify their permissions
- Save changes
- Permission changes take effect immediately

### 6. Remove a Sub-User
- Click the delete icon next to a sub-user
- Confirm removal
- The sub-user can no longer access the server

## Error Cases

### Email Not Found
- If the email does not match any Pterodactyl account, an error is shown
- The person must create an account first at https://panel.pocketburrito.ca/auth/register

### Duplicate Sub-User
- Attempting to add an email that is already a sub-user results in an error
- Edit the existing sub-user instead

### Self-Addition
- The server owner cannot add themselves as a sub-user
- They already have full permissions

### Permission Escalation
- Sub-users with "User Create" permission can add other sub-users
- They cannot grant permissions they do not have themselves

## Success Criteria
- Sub-user is added and appears in the users list
- Sub-user can log in and see the server on their dashboard
- Permissions correctly restrict sub-user actions
- Permission changes take effect immediately without re-login
- Removed sub-users lose access to the server

## Related Workflows
- [07-view-my-servers.md](07-view-my-servers.md)
- [08-server-console.md](08-server-console.md)
- [09-server-file-manager.md](09-server-file-manager.md)
- [14-server-backups.md](14-server-backups.md)

## Test Scenarios
1. **Add Sub-User:** Enter valid email -> Set permissions -> Sub-user added -> They can see the server
2. **Console Only:** Add sub-user with only Console permission -> They can view console but not manage files
3. **Full Access:** Add sub-user with all permissions -> They have complete management access
4. **File Access Only:** Add sub-user with only File permissions -> They can manage files but not start/stop server
5. **Edit Permissions:** Change a sub-user from console-only to full access -> New permissions take effect
6. **Remove Sub-User:** Remove a sub-user -> They no longer see the server on their dashboard
7. **Invalid Email:** Enter non-existent email -> Error shown
8. **Duplicate Sub-User:** Add same email twice -> Error shown
9. **Sub-User Adds Sub-User:** Sub-user with User Create permission -> Can add another sub-user with limited permissions
10. **Permission Boundary:** Sub-user with limited permissions -> Cannot access restricted tabs

---
**Status:** Documented | Testing Pending
