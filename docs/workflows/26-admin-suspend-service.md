# Admin Workflow: Suspend a Customer's Service

## Overview
Admin suspends a customer's game server hosting service, which stops the Pterodactyl server and prevents the customer from starting it. Commonly used for overdue invoices, terms of service violations, or abuse.

## Entry Points

### From Paymenter Admin
- **URL:** https://billing.pocketburrito.ca/admin/services/{service-id}
- Suspension via Paymenter automatically communicates with Pterodactyl

### From Pterodactyl Admin
- **URL:** https://panel.pocketburrito.ca/admin/servers/view/{server-id}
- Direct server suspension in Pterodactyl (does not update Paymenter status)

## Prerequisites
- Admin is logged into https://billing.pocketburrito.ca/admin and/or https://panel.pocketburrito.ca/admin
- The service/server to be suspended is currently Active

## Steps

### 1. Identify the Service to Suspend
- Navigate to the service via admin services list, user detail, or ticket context
- Verify the correct customer and server before proceeding
- Note the reason for suspension (overdue payment, abuse report, TOS violation)

### 2. Suspend via Paymenter (Preferred Method)
- Open the service detail in Paymenter admin
- Click "Suspend" or change status to "Suspended"
- Paymenter sends a suspend API call to Pterodactyl
- The Pterodactyl server is stopped and locked
- The customer sees the service as "Suspended" in their billing portal

### 3. What Happens When Suspended
- **Server Stopped:** The game server process is terminated
- **Controls Locked:** The customer cannot start, restart, or access the server console
- **Files Preserved:** Server files, worlds, and databases remain intact
- **Billing Portal:** Service shows "Suspended" status with a notice
- **Panel:** Server appears with a suspended badge; all management actions are blocked
- **Players:** Cannot connect to the game server (server is offline)

### 4. Notify the Customer
- If suspension is due to overdue payment:
  - Paymenter may send an automated notification
  - Include information about how to pay the invoice and restore service
- If suspension is due to TOS violation:
  - Send a manual notification explaining the violation and required remediation
  - Use the ticket system or direct email

### 5. Automatic Suspension (Overdue Invoices)
- Paymenter can be configured to automatically suspend services after an invoice grace period
- The cron job checks for overdue invoices and triggers suspension
- No manual admin action needed for payment-related suspensions

## Reversal: Unsuspending

### Via Paymenter
- Open the suspended service in Paymenter admin
- Click "Unsuspend" or change status back to "Active"
- Paymenter sends an unsuspend API call to Pterodactyl
- The server is unlocked; the customer can start and manage it again

### Via Pterodactyl
- Open the server in Pterodactyl admin
- Click "Unsuspend Server" on the Manage tab
- The server is unlocked but Paymenter may still show "Suspended"
- Always prefer unsuspending through Paymenter to keep both systems in sync

## Error Cases

### Paymenter-Pterodactyl Sync Failure
- Suspension command fails to reach Pterodactyl (API error, connectivity issue)
- Service shows Suspended in Paymenter but server is still running in Pterodactyl
- Admin must manually suspend in Pterodactyl or troubleshoot the API connection

### Already Suspended
- Attempting to suspend an already-suspended service
- No change occurs; may show a warning

### Customer Dispute
- Customer claims suspension is unjustified
- Review invoices, payment history, and any abuse reports
- Unsuspend if the dispute is valid; otherwise explain the reason via ticket

## Success Criteria
- Suspended server is stopped and customer cannot start it
- Server files and databases remain intact (no data loss)
- Service status shows "Suspended" in both Paymenter and Pterodactyl
- Customer is informed of the suspension and how to resolve it
- Unsuspending restores full access to the server
- Automatic suspension triggers correctly for overdue invoices

## Related Workflows
- [20-admin-manage-services.md](20-admin-manage-services.md)
- [24-admin-pterodactyl-servers.md](24-admin-pterodactyl-servers.md)
- [27-admin-terminate-service.md](27-admin-terminate-service.md)
- [18-view-invoices.md](18-view-invoices.md)

## Test Scenarios
1. **Manual Suspend:** Suspend an active service via Paymenter -> Server stops in Pterodactyl -> Customer sees Suspended
2. **Customer Blocked:** Suspended user tries to start server -> Action denied
3. **Files Preserved:** Suspend server -> Check file manager as admin -> Files still exist
4. **Unsuspend:** Unsuspend the service -> Customer can start and manage server
5. **Auto-Suspend:** Let invoice go overdue past grace period -> Service auto-suspended
6. **Pay and Unsuspend:** Customer pays overdue invoice -> Service auto-unsuspended (if configured)
7. **Sync Failure:** Simulate API failure -> Verify both systems are checked
8. **Double Suspend:** Attempt to suspend an already-suspended service -> No adverse effect
9. **Notification Sent:** Suspend a service -> Customer receives notification
10. **Pterodactyl Direct:** Suspend only in Pterodactyl -> Paymenter still shows Active (sync issue)

---
**Status:** Documented | Testing Pending
