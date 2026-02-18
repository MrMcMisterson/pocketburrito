# Admin Workflow: Terminate a Service

## Overview
Admin permanently terminates a customer's game server hosting service, which deletes the Pterodactyl server including all files, databases, and backups. This action is irreversible.

## Entry Points

### From Paymenter Admin
- **URL:** https://billing.pocketburrito.ca/admin/services/{service-id}
- Termination via Paymenter deletes the Pterodactyl server via API

### From Pterodactyl Admin (Manual)
- **URL:** https://panel.pocketburrito.ca/admin/servers/view/{server-id}
- Direct server deletion (does not update Paymenter service status)

## Prerequisites
- Admin is logged into https://billing.pocketburrito.ca/admin
- The service to be terminated has been identified and verified
- Ideally the customer has been notified (unless automatic termination after prolonged non-payment)

## Steps

### 1. Verify the Service
- Navigate to the service detail in Paymenter admin
- Confirm the correct customer, product, and server
- Double-check the server name and IP match the intended target
- Review the reason for termination (cancellation request, prolonged non-payment, TOS violation)

### 2. Recommend Backup (If Applicable)
- If the customer requested cancellation but may want their data:
  - Inform them to download backups before termination
  - Provide a deadline before termination proceeds
- If the termination is due to non-payment, the customer was given a grace period during suspension

### 3. Terminate via Paymenter
- Open the service detail page
- Click "Terminate" or change status to "Terminated"
- Confirm the action in the warning dialog
- Paymenter sends a terminate API call to Pterodactyl
- The following are permanently deleted:
  - **Server container and files** (worlds, configs, plugins)
  - **Databases** associated with the server
  - **Backups** stored for the server
  - **Port allocations** are freed
  - **Schedules** are removed

### 4. Post-Termination State
- **Paymenter:** Service status shows "Terminated"
- **Pterodactyl:** Server no longer exists in the panel
- **Customer:** Service no longer appears in their active services
- **Billing:** No further invoices are generated for this service
- **Resources:** Memory, disk, and ports are freed for other servers

### 5. Automatic Termination
- Paymenter can be configured to automatically terminate services after a set period of suspension
- Example flow: Invoice overdue -> Suspend after 3 days -> Terminate after 14 days
- The cron job handles this automatically based on configuration

## Important Warnings
- **This action is irreversible.** All server data is permanently deleted.
- Always verify you are terminating the correct service
- Consider suspending first to allow the customer time to retrieve data
- Terminated services cannot be restored; a new purchase is required

## Error Cases

### Paymenter-Pterodactyl Sync Failure
- Termination command fails to reach Pterodactyl
- Service marked as Terminated in Paymenter but server still exists in Pterodactyl
- Admin must manually delete the server in Pterodactyl admin

### Wrong Service Terminated
- Admin terminates the wrong customer's service by mistake
- Data cannot be recovered
- Admin must provision a new server and communicate the error to the affected customer
- This is why verification before termination is critical

### Customer Wants Data Back
- After termination, data cannot be retrieved
- If the customer downloaded backups before termination, they can use those with a new service
- Otherwise, the data is permanently lost

### Orphaned Paymenter Service
- Service shows Terminated in Paymenter but the Pterodactyl server was already manually deleted
- No harmful effect; Paymenter's terminate API call to Pterodactyl will return a "not found" response

## Success Criteria
- Server is completely removed from Pterodactyl (files, databases, backups, container)
- Service status is "Terminated" in Paymenter
- No further invoices are generated
- Port allocations and resources are freed
- Customer no longer sees the service in their active services
- Automatic termination triggers correctly for prolonged suspensions

## Related Workflows
- [20-admin-manage-services.md](20-admin-manage-services.md)
- [24-admin-pterodactyl-servers.md](24-admin-pterodactyl-servers.md)
- [26-admin-suspend-service.md](26-admin-suspend-service.md)

## Test Scenarios
1. **Manual Terminate:** Terminate an active service -> Server deleted from Pterodactyl -> Service shows Terminated
2. **Verify Deletion:** After termination -> Server not found in Pterodactyl admin -> Files gone
3. **Billing Stopped:** After termination -> No new invoices generated for the service
4. **Resources Freed:** After termination -> Memory and port allocations available for new servers
5. **Customer View:** Customer logs in -> Terminated service no longer in active services
6. **Auto-Terminate:** Service suspended for 14+ days -> Automatically terminated by cron
7. **Sync Failure:** Simulate API failure -> Paymenter shows Terminated -> Manually clean up Pterodactyl
8. **Already Terminated:** Attempt to terminate an already-terminated service -> No adverse effect
9. **Backup Before Terminate:** Notify customer -> Customer downloads backup -> Terminate -> Data saved locally
10. **New Purchase After Terminate:** Customer purchases new service for same game -> Fresh server provisioned

---
**Status:** Documented | Testing Pending
