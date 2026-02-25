# User Workflow: Server Settings

## Overview
Customer configures server startup parameters and manages server-level settings in Pterodactyl, including environment variables, server name, and the reinstall option.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}/settings
- **From:** "Settings" tab in the server management interface

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has a provisioned server
- User (or sub-user) has settings/startup permissions

## Steps

### 1. Navigate to Settings
- Open the server from the Pterodactyl dashboard
- Click the "Settings" tab in the left sidebar (may be split into "Startup" and "Settings" sub-tabs)

### 2. View Startup Configuration
- The Startup section displays:
  - **Startup Command:** The full command used to launch the server (read-only, set by the egg)
  - **Docker Image:** The container image used for the server environment (may be selectable if the egg provides multiple options)
  - **Startup Variables:** Editable environment variables defined by the egg

### 3. Edit Startup Variables
- Each variable shows:
  - Variable name and description
  - Current value
  - Input field to change the value
  - Validation rules (e.g., required, regex pattern, min/max)
- Common startup variables by game:
  - **Minecraft:** Server version, server JAR file, memory allocation
  - **Valheim:** World name, server name, server password, public visibility
  - **Rust:** Server name, map size, max players, server description
  - **ARK:** Map name, server name, server password, max players
  - **Terraria:** World name, max players, server password
- Edit the desired variables and click "Save" or "Update"
- Most variable changes require a server restart to take effect

### 4. Change Server Name
- The server name field (display name in the panel) can be edited
- This changes only the name shown in the Pterodactyl dashboard, not the in-game server name
- In-game server name is typically a startup variable

### 5. Change Docker Image
- If the egg supports multiple Docker images (e.g., different Java versions for Minecraft)
- Select the desired image from the dropdown
- Restart the server for the change to take effect

### 6. Reinstall Server
- At the bottom of the Settings page, find the "Reinstall Server" section
- Click "Reinstall Server"
- A confirmation dialog warns that this will:
  - Delete all server files
  - Re-run the egg installation script
  - Reset the server to a fresh state
- Confirm the reinstall
- See [28-server-reinstall.md](28-server-reinstall.md) for detailed reinstall workflow

## Error Cases

### Invalid Variable Value
- Entering a value that does not match the variable's validation rules (e.g., non-numeric for a port field)
- Error message displayed inline
- Save is blocked until corrected

### Docker Image Incompatible
- Selecting an incompatible Docker image may cause the server to fail on startup
- Review console output for errors after changing the image

### Startup Command Not Editable
- Users cannot modify the startup command directly; it is defined by the egg
- Admin must update the egg or server configuration to change the startup command

### Variable Changes Not Applied
- If the server is not restarted after changing variables, old values remain in effect
- Always restart after saving variable changes

## Success Criteria
- Startup variables are displayed with current values
- Edited variables are saved and persisted
- Variable changes take effect after server restart
- Server name change reflects in the dashboard
- Docker image selection works for eggs with multiple options
- Reinstall option is accessible and functions correctly

## Related Workflows
- [07-view-my-servers.md](07-view-my-servers.md)
- [08-server-console.md](08-server-console.md)
- [13-server-power-controls.md](13-server-power-controls.md)
- [28-server-reinstall.md](28-server-reinstall.md)

## Test Scenarios
1. **View Variables:** Open Startup tab -> All egg-defined variables displayed with current values
2. **Edit Variable:** Change Minecraft server version -> Save -> Restart -> Server runs new version
3. **Invalid Variable:** Enter invalid value for a validated field -> Error shown, save blocked
4. **Change Server Name:** Edit server name -> Save -> Dashboard shows new name
5. **Change Docker Image:** Select different Java version for Minecraft -> Restart -> Server uses new image
6. **Variable Persistence:** Edit variable -> Save -> Refresh page -> New value persists
7. **Restart Required:** Change a variable -> Do not restart -> Old value still in effect
8. **Reinstall Button:** Click Reinstall -> Confirm -> Server files wiped and reinstalled
9. **Sub-user Access:** Sub-user with startup permissions -> Can view and edit variables
10. **Sub-user Denied:** Sub-user without startup permissions -> Settings tab restricted

---
**Status:** Documented | Testing Pending
