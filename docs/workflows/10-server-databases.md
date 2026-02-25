# User Workflow: Server Databases

## Overview
Customer creates and manages MySQL databases for their game server through the Pterodactyl panel. Databases are commonly used by plugins and mods that require persistent structured data storage (e.g., permissions plugins, economy plugins, web maps).

## Entry Point
- **URL:** https://panel.pocketburrito.ca/server/{server-id}/databases
- **From:** "Databases" tab in the server management interface

## Prerequisites
- User is logged into https://panel.pocketburrito.ca
- User has a provisioned server
- Server has a database allocation limit greater than 0 (configured by admin in Pterodactyl)
- A database host is configured on the Pterodactyl node

## Steps

### 1. Navigate to Databases Tab
- Open the server from the Pterodactyl dashboard
- Click the "Databases" tab in the left sidebar
- The page displays existing databases (if any) and a "New Database" button

### 2. Create a New Database
- Click "New Database" button
- Enter a database name (alphanumeric and underscores, automatically prefixed with `s{server-id}_`)
- Optionally set "Connections From" to restrict access by IP (default `%` allows all)
- Click "Create Database"
- Pterodactyl provisions the MySQL database on the configured database host

### 3. View Database Credentials
- After creation, the database appears in the list with:
  - **Database Name:** The prefixed database name
  - **Username:** Auto-generated MySQL username
  - **Password:** Click the eye icon to reveal the password
  - **Host:** The MySQL server address (typically `127.0.0.1` or the server IP)
  - **Port:** MySQL port (typically `3306`)
- These credentials are used in plugin/mod configuration files

### 4. Use Database in Game Server
- Copy the connection details into the relevant plugin or mod config file
- Example for a Minecraft plugin (`plugins/LuckPerms/config.yml`):
  ```yaml
  storage-method: MySQL
  data:
    address: 127.0.0.1:3306
    database: s1_luckperms
    username: u1_generated
    password: revealed_password
  ```
- Restart the server for the plugin to connect

### 5. Rotate Database Password
- Click the rotate/refresh icon next to the database entry
- A new password is generated
- Update any plugin configs that reference the old password
- Restart the server

### 6. Delete a Database
- Click the delete (trash) icon next to the database entry
- Confirm deletion in the dialog
- The MySQL database and user are dropped permanently
- All data in the database is lost

## Error Cases

### Database Limit Reached
- If the server's database limit is 0 or already met, the "New Database" button is disabled
- User must contact support to increase the limit

### Database Host Not Configured
- If no database host exists on the node, database creation fails
- Admin must configure a database host in Pterodactyl admin

### Invalid Database Name
- Names with special characters are rejected
- Error message indicates allowed characters

### Connection Refused in Plugin
- Incorrect host, port, username, or password in plugin config
- Verify credentials match those shown in Pterodactyl
- Check that "Connections From" allows the server's IP

## Success Criteria
- Database is created and appears in the databases list
- Credentials are accessible and correct
- Game server plugin can connect to the database using provided credentials
- Password rotation generates a new working password
- Database deletion removes the database and frees the allocation slot

## Related Workflows
- [07-view-my-servers.md](07-view-my-servers.md)
- [08-server-console.md](08-server-console.md)
- [09-server-file-manager.md](09-server-file-manager.md)

## Test Scenarios
1. **Create Database:** Click "New Database" -> Enter name -> Database created and credentials shown
2. **View Credentials:** Click eye icon on password -> Password revealed
3. **Plugin Connection:** Enter credentials in Minecraft LuckPerms config -> Restart -> Plugin connects to MySQL
4. **Rotate Password:** Click rotate -> New password generated -> Update config -> Plugin reconnects
5. **Delete Database:** Click delete -> Confirm -> Database removed from list
6. **Limit Reached:** Server with 0 database limit -> "New Database" button disabled or error shown
7. **Invalid Name:** Enter `my-db!` as name -> Validation error
8. **Multiple Databases:** Create 2 databases -> Both listed with unique credentials

---
**Status:** Documented | Testing Pending
