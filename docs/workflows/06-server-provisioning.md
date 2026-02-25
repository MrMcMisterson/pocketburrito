# Workflow: Automatic Server Provisioning

## Overview
When a customer's payment is processed, Paymenter automatically creates a game server via the Pterodactyl API. This is the core automation that makes PocketBurrito work.

## Trigger
- Invoice status changes to "Paid" (automatically via payment gateway or manually by admin)

## Technical Flow

### 1. Invoice Paid Event
- Paymenter detects invoice status change to "Paid"
- Associated service/order record identified
- Product settings retrieved (nest_id, egg_id, memory, disk, cpu, etc.)

### 2. Config Option Resolution
- For multi-tier products (15 of 16 games):
  - `ExtensionHelper::getServiceProperties()` runs
  - Maps parent ConfigOption (`env_variable="memory"`) to selected child's `env_variable` value
  - Example: User selected "6GB RAM" -> child env_variable = "6144"
  - This value overrides the product's base memory setting
- For Valheim (single-tier):
  - No ConfigOption; uses product's base settings directly

### 3. Pterodactyl API Call
- `Pterodactyl::createServer()` executes
- Settings merged: `array_merge($productSettings, $configOptionProperties)`
- API call to Pterodactyl at https://panel.pocketburrito.ca
- API key: stored in Paymenter extension config
- Creates server with:
  - **Nest ID** and **Egg ID** from product config
  - **Memory** from ConfigOption override (or product default)
  - **Disk** from product config
  - **CPU** from product config
  - **Node allocation** auto-assigned from available pool
  - **Startup command** and **environment variables** from egg

### 4. Pterodactyl Server Creation
- Server record created in Pterodactyl database
- Docker container configured on Wings daemon
- Server files installed (egg installer runs)
- Startup script executed
- Server status: "Installing" -> "Running"

### 5. Paymenter Service Update
- Service status: "Pending" -> "Active"
- Server ID linked to service record
- Connection details populated (IP, port, SFTP credentials)

### 6. Customer Notification
- Email sent with:
  - Server name and game type
  - Connection IP and port
  - Panel login link (https://panel.pocketburrito.ca)
  - SFTP credentials (if applicable)

## Timing
- Payment to server creation: typically 30 seconds to 2 minutes
- Server installation (egg setup): varies by game (30 seconds to 5 minutes)
- Total: customer can usually connect within 5 minutes

## Infrastructure
- **Single node** (Node 1) on Hetzner VPS at 5.78.100.72
- **10 custom nests** for game categories
- **14+ eggs** with specific startup commands
- Pterodactyl Wings daemon manages Docker containers

## Products and Their Server Settings

### All 16 Products (IDs 53-68)
Each product has:
- `nest_id`: References one of 10 custom nests
- `egg_id`: References specific game egg (IDs 29-38+)
- `memory`: Base RAM (overridden by ConfigOption for multi-tier)
- `disk`: Disk allocation in MB
- `cpu`: CPU percentage allocation
- Startup command template and environment variables from egg JSON

### Egg Files (in /eggs/ directory)
14 egg JSON files defining:
- Docker image
- Startup command
- Environment variables (port, game version, world name, etc.)
- Install script

## Common Failures

### Pterodactyl API Connection Error
- **Cause:** API key invalid/expired, Pterodactyl down
- **Check:** Paymenter logs at `/var/www/paymenter/paymenter/storage/logs/`
- **Fix:** Verify API key in Paymenter Pterodactyl extension settings

### Node Out of Resources
- **Cause:** Node 1 has no available memory/disk allocations
- **Check:** Pterodactyl admin -> Nodes -> Node 1 -> Allocation tab
- **Fix:** Free up resources or add allocations

### Egg Not Found
- **Cause:** Product references egg_id that doesn't exist
- **Check:** Pterodactyl admin -> Nests -> Find referenced egg
- **Fix:** Correct product server settings in Paymenter admin

### Wrong Server Specs
- **Cause:** ConfigOption mapping incorrect, or product settings wrong
- **Check:** Compare ordered tier RAM with created server RAM in Pterodactyl
- **Fix:** Correct ConfigOption env_variable values or product memory settings

### Server Stuck "Installing"
- **Cause:** Egg install script failed, network issue downloading files
- **Check:** Pterodactyl admin -> Server -> Console/Logs
- **Fix:** Reinstall server or check egg install script

## Verification Checklist (Post-Provisioning)
- [ ] Invoice status: "Paid"
- [ ] Paymenter service status: "Active"
- [ ] Pterodactyl server exists with correct egg
- [ ] Server RAM matches ordered tier
- [ ] Server status: "Running" (after install completes)
- [ ] Customer can see server in "My Servers" / panel
- [ ] Customer can access console, files, databases

## Related Workflows
- [04-checkout.md](04-checkout.md)
- [07-view-my-servers.md](07-view-my-servers.md)
- [20-admin-manage-services.md](20-admin-manage-services.md)

## Test Scenarios
1. **Minecraft 3GB:** Order -> Pay -> Server created with 3072MB RAM
2. **Minecraft 16GB:** Order -> Pay -> Server created with 16384MB RAM
3. **Valheim:** Order -> Pay -> Server created with 6144MB RAM (fixed)
4. **All 16 Games at Lowest Tier:** Order each -> All provision correctly
5. **Correct Egg Assignment:** Verify each game server uses correct startup command
6. **Timing:** Measure time from payment to server accessible
7. **Node Capacity:** Order when node is near capacity -> Graceful error or queue

---
**Status:** Documented | Critical Testing Required
