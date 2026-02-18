# User Workflow: Server Console

## Overview
Customer uses the Pterodactyl server console to view live server output and send commands to their running game server.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}
- **From:** Server list on Pterodactyl dashboard, or "Manage" button from billing service detail

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has at least one provisioned server
- Server is in a Running or Starting state (console viewable in any state, commands require Running)

## Steps

### 1. Navigate to Server Console
- From the Pterodactyl dashboard, click on the desired server card
- The console tab is the default view when opening a server
- The console area displays a terminal-style output window

### 2. View Live Server Output
- Server log output streams in real-time via WebSocket connection
- Output includes startup messages, player join/leave events, errors, and game-specific logs
- Scroll up to view historical output from the current session
- Console output is not persisted between server restarts

### 3. Send Commands
- Click the command input field at the bottom of the console
- Type a game-specific command (e.g., `say Hello` for Minecraft, `status` for Rust)
- Press Enter to send the command to the server process
- Command output appears in the console stream above
- No leading slash is needed (Pterodactyl sends raw input to the server process stdin)

### 4. Common Game Commands
| Game | Example Commands |
|------|-----------------|
| Minecraft | `say <msg>`, `op <player>`, `whitelist add <player>`, `stop` |
| Valheim | Server does not accept stdin commands |
| Rust | `status`, `say <msg>`, `kick <player>`, `server.save` |
| ARK | `listplayers`, `saveworld`, `broadcast <msg>` |
| Terraria | `say <msg>`, `kick <player>`, `save`, `exit` |
| Garry's Mod | `status`, `changelevel <map>`, `kick <player>` |

## Error Cases

### Server Not Running
- Console displays last known output but is static
- Command input field is disabled or commands have no effect
- User must start the server via power controls before sending commands

### WebSocket Connection Lost
- Console output freezes
- A reconnection notice may appear
- Refreshing the page re-establishes the connection

### Insufficient Permissions
- Sub-users without console permission cannot send commands
- Console output may still be visible depending on permission configuration

## Success Criteria
- Console displays live server output in real-time
- Commands sent via input field are received and executed by the game server
- Output updates immediately after command execution
- Scrollback allows reviewing recent output
- Console reconnects automatically after brief network interruptions

## Related Workflows
- [07-view-my-servers.md](07-view-my-servers.md)
- [13-server-power-controls.md](13-server-power-controls.md)
- [17-server-subusers.md](17-server-subusers.md)

## Test Scenarios
1. **View Console Output:** Start a Minecraft server -> Console shows startup log including "Done" message
2. **Send Command:** Type `say Hello` on a running Minecraft server -> Message appears in console output
3. **Command on Stopped Server:** Attempt to send command with server stopped -> Command has no effect
4. **Scroll Back:** Generate output, scroll up -> Previous output is viewable
5. **Page Refresh:** Refresh browser while server is running -> Console reconnects and resumes streaming
6. **Sub-user Access:** Sub-user with console permission -> Can view and send commands
7. **Sub-user Denied:** Sub-user without console permission -> Cannot send commands

---
**Status:** Documented | Testing Pending
