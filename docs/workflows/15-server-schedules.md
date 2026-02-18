# User Workflow: Server Schedules

## Overview
Customer sets up automated scheduled tasks for their game server in Pterodactyl, such as automatic restarts, backups, and custom commands executed on a cron-based schedule.

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}/schedules
- **From:** "Schedules" tab in the server management interface

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has a provisioned server
- User (or sub-user) has schedule permissions

## Steps

### 1. Navigate to Schedules Tab
- Open the server from the Pterodactyl dashboard
- Click the "Schedules" tab in the left sidebar
- The page displays existing schedules (if any) and a "Create Schedule" button

### 2. Create a New Schedule
- Click "Create Schedule"
- Fill in the schedule form:
  - **Name:** Descriptive label (e.g., "Daily Restart", "Hourly Backup")
  - **Minute:** Cron minute field (0-59, or `*/30` for every 30 minutes)
  - **Hour:** Cron hour field (0-23, or `*` for every hour)
  - **Day of Month:** Cron day field (1-31 or `*`)
  - **Month:** Cron month field (1-12 or `*`)
  - **Day of Week:** Cron day of week field (0-6, Sunday=0, or `*`)
  - **Enabled:** Toggle to activate/deactivate the schedule
  - **Only When Server Is Online:** Toggle to skip execution if the server is offline
- Click "Create Schedule"

### 3. Add Tasks to Schedule
- After creating the schedule, click on it to open the task editor
- Click "New Task" to add an action
- Task types:
  - **Send Command:** Execute a console command (e.g., `say Server restarting in 5 minutes`)
  - **Send Power Action:** Start, Stop, Restart, or Kill the server
  - **Create Backup:** Trigger a backup (respects backup limits)
- Configure the task:
  - **Time Offset (seconds):** Delay before this task executes (relative to the schedule trigger or previous task)
  - **Payload:** The command text or power action type
- Add multiple tasks to create a sequence

### 4. Common Schedule Examples

#### Auto-Restart Every 6 Hours with Warning
| Task # | Type | Payload | Offset |
|--------|------|---------|--------|
| 1 | Send Command | `say Server restarting in 5 minutes` | 0s |
| 2 | Send Command | `say Server restarting in 1 minute` | 240s |
| 3 | Send Power Action | Restart | 300s |

Schedule: Minute `0`, Hour `*/6`, Day `*`, Month `*`, Day of Week `*`

#### Daily Backup at 4 AM
| Task # | Type | Payload | Offset |
|--------|------|---------|--------|
| 1 | Create Backup | (automatic) | 0s |

Schedule: Minute `0`, Hour `4`, Day `*`, Month `*`, Day of Week `*`

#### Nightly Restart with Backup
| Task # | Type | Payload | Offset |
|--------|------|---------|--------|
| 1 | Send Command | `say Server restarting for nightly maintenance in 5 minutes` | 0s |
| 2 | Create Backup | (automatic) | 240s |
| 3 | Send Power Action | Restart | 300s |

Schedule: Minute `0`, Hour `3`, Day `*`, Month `*`, Day of Week `*`

### 5. Edit a Schedule
- Click on an existing schedule in the list
- Modify the cron timing, name, or enabled status
- Add, edit, or remove individual tasks
- Save changes

### 6. Delete a Schedule
- Click on the schedule
- Click the "Delete" button
- Confirm deletion
- All tasks within the schedule are also removed

### 7. Enable/Disable a Schedule
- Toggle the "Enabled" switch on the schedule
- Disabled schedules retain their configuration but do not execute

## Error Cases

### Invalid Cron Expression
- Entering values outside valid ranges produces a validation error
- Common mistake: using `24` for hour (valid range is 0-23)

### Command Fails on Stopped Server
- If "Only When Server Is Online" is not enabled, command tasks fail silently when the server is offline
- Power action "Start" still works on an offline server

### Backup Limit Reached
- Scheduled backup task fails if backup limit is reached and all backups are locked
- No notification is sent to the user; check backup list for failures

### Task Offset Too Long
- Very long offsets between tasks may cause unexpected behavior if the next schedule trigger fires before all tasks complete

## Success Criteria
- Schedules execute at the configured cron times
- Task sequences execute in order with correct time offsets
- Console commands are sent to the running server
- Power actions change the server state as expected
- Backups are created on schedule
- Disabled schedules do not execute
- "Only When Server Is Online" correctly skips offline servers

## Related Workflows
- [08-server-console.md](08-server-console.md)
- [13-server-power-controls.md](13-server-power-controls.md)
- [14-server-backups.md](14-server-backups.md)

## Test Scenarios
1. **Create Schedule:** Create a schedule with minute `*/5` -> Task executes every 5 minutes
2. **Restart Schedule:** Create auto-restart schedule -> Server restarts at scheduled time
3. **Backup Schedule:** Create daily backup schedule -> Backup created at scheduled time
4. **Task Sequence:** Create multi-task schedule (warn, then restart) -> Warning appears, then server restarts after offset
5. **Disable Schedule:** Disable a schedule -> Schedule does not execute at next trigger time
6. **Only When Online:** Enable "Only When Server Is Online" -> Stop server -> Schedule skips execution
7. **Edit Schedule:** Change schedule timing -> New timing takes effect
8. **Delete Schedule:** Delete a schedule -> No longer appears in list or executes
9. **Invalid Cron:** Enter invalid cron values -> Validation error shown
10. **Sub-user Access:** Sub-user with schedule permissions -> Can create and manage schedules

---
**Status:** Documented | Testing Pending
