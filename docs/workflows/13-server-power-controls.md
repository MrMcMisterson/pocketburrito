# User Workflow: Server Power Controls

## Overview
Customer controls their game server's power state through the Pterodactyl panel, including starting, stopping, restarting, and force-killing the server process.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}
- **From:** Server console page (power buttons displayed above the console) or server list (quick actions)

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has a provisioned server
- User (or sub-user) has power control permissions

## Power Actions

### Start
- **Button:** "Start" (displayed when server is Stopped or Offline)
- **Behavior:**
  - Pterodactyl sends a start signal to the Wings daemon
  - The server process begins startup using the configured startup command
  - Console shows startup output (loading worlds, initializing plugins, etc.)
  - Status transitions: Offline -> Starting -> Running
  - Startup time varies by game (Minecraft ~30s, ARK ~2-5min, Rust ~1-3min)

### Stop
- **Button:** "Stop" (displayed when server is Running)
- **Behavior:**
  - Pterodactyl sends a graceful stop signal to the server process
  - The game server saves state and shuts down cleanly
  - Console shows shutdown messages (saving worlds, disconnecting players)
  - Status transitions: Running -> Stopping -> Offline
  - If the server does not stop within the timeout, it may require a kill

### Restart
- **Button:** "Restart" (displayed when server is Running)
- **Behavior:**
  - Equivalent to a stop followed by an automatic start
  - Server gracefully shuts down, then immediately starts back up
  - Status transitions: Running -> Stopping -> Offline -> Starting -> Running
  - Players are disconnected during restart and must reconnect
  - Useful after config changes or plugin installations

### Kill
- **Button:** "Kill" (displayed when server is Running or stuck in Starting/Stopping)
- **Behavior:**
  - Forcefully terminates the server process (SIGKILL)
  - No graceful shutdown; unsaved data may be lost
  - Use only when the server is unresponsive or stuck
  - Status transitions immediately to Offline
  - A confirmation dialog is shown before execution

## Steps

### 1. Navigate to Server
- From the Pterodactyl dashboard, click on the server card
- The console tab loads with power buttons visible above the console output

### 2. Execute Power Action
- Click the appropriate power button (Start, Stop, Restart, or Kill)
- For Kill, confirm the action in the warning dialog
- The server status indicator updates in real-time
- Console output reflects the action (startup logs, shutdown messages)

### 3. Verify State Change
- Status badge updates to reflect the new state
- Console output confirms the action completed
- For Start/Restart: wait for "Done" or equivalent ready message
- For Stop/Kill: console output ceases and status shows Offline

## Server Status Indicators
| Status | Color | Meaning |
|--------|-------|---------|
| Running | Green | Server is online and accepting connections |
| Starting | Yellow | Server process is initializing |
| Stopping | Yellow | Server is shutting down gracefully |
| Offline | Red/Grey | Server process is not running |
| Installing | Blue | Initial server setup in progress |

## Error Cases

### Server Stuck in Starting
- Server process fails to reach Running state
- Console may show error messages (port conflict, missing files, out of memory)
- Use Kill to force-stop, then review console logs for the error

### Server Stuck in Stopping
- Graceful stop times out (common with large Minecraft worlds)
- Use Kill to force-terminate the process
- Check if world save completed in the console output before killing

### Insufficient Resources
- Server fails to start due to memory or disk limits
- Console shows out-of-memory errors
- User may need to upgrade their plan for more resources

### Server Suspended
- Admin has suspended the service
- All power controls are disabled
- User must contact support or pay overdue invoices

## Success Criteria
- Start: Server transitions to Running and is connectable by game client
- Stop: Server saves state and transitions to Offline
- Restart: Server completes stop and start cycle, returning to Running
- Kill: Server immediately terminates regardless of state
- Status indicators accurately reflect current server state
- Console output corresponds to the power action taken

## Related Workflows
- [07-view-my-servers.md](07-view-my-servers.md)
- [08-server-console.md](08-server-console.md)
- [15-server-schedules.md](15-server-schedules.md)
- [16-server-settings.md](16-server-settings.md)

## Test Scenarios
1. **Start Server:** Click Start on a stopped server -> Status becomes Running -> Game client can connect
2. **Stop Server:** Click Stop on a running server -> Server saves and stops -> Status becomes Offline
3. **Restart Server:** Click Restart -> Server stops and starts -> Returns to Running
4. **Kill Server:** Click Kill -> Confirm dialog -> Server immediately stops
5. **Start After Kill:** Kill a server -> Start it again -> Server starts normally
6. **Stuck Server:** Server stuck in Starting -> Kill -> Investigate console errors
7. **Suspended Server:** Attempt power action on suspended server -> Controls disabled
8. **Sub-user Power:** Sub-user with power permissions -> Can start/stop/restart
9. **Sub-user Denied:** Sub-user without power permissions -> Power buttons disabled

---
**Status:** Documented | Testing Pending
