# Admin Workflow: Manage Customer Services

## Overview
Admin views and manages customer services (active game server subscriptions) through the Paymenter admin panel, including viewing service details, changing status, and linking to Pterodactyl servers.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/admin/services (or similar admin route)
- **From:** Paymenter admin sidebar under "Services" or "Orders"

## Prerequisites
- Admin is logged into https://billing.pocketburrito.ca/admin
- Admin has appropriate permissions to manage services

## Steps

### 1. Navigate to Services List
- Log in to the Paymenter admin panel at https://billing.pocketburrito.ca/admin
- Click "Services" or "Orders" in the admin sidebar
- The services list displays all customer services with filtering options

### 2. View Services List
- Each service entry shows:
  - Service ID
  - Customer name and email
  - Product name and plan
  - Status: Active, Pending, Suspended, Terminated, Cancelled
  - Created date
  - Next due date
  - Price
- Filter by status, product, or search by customer name/email

### 3. View Service Details
- Click on a service to open its detail page
- Details include:
  - Customer information
  - Product and plan details (including ConfigOption selections)
  - Server information (Pterodactyl server ID, IP, port)
  - Billing cycle and pricing
  - Service status and dates (created, next due, cancelled)
  - Associated invoices
  - Service-specific properties (memory, disk, etc.)

### 4. Change Service Status
- On the service detail page, use the status controls to:
  - **Activate:** Set a pending service to active (triggers server creation if not yet provisioned)
  - **Suspend:** Suspend the service (stops the Pterodactyl server, see [26-admin-suspend-service.md](26-admin-suspend-service.md))
  - **Unsuspend:** Reactivate a suspended service (starts the server)
  - **Terminate:** Permanently delete the service and server (see [27-admin-terminate-service.md](27-admin-terminate-service.md))
  - **Cancel:** Mark for cancellation at end of billing period

### 5. Edit Service Properties
- Modify service configuration:
  - Change the assigned product or plan
  - Update custom field values
  - Adjust billing cycle or pricing (override)
  - Change the next due date

### 6. View Linked Pterodactyl Server
- The service detail shows the linked Pterodactyl server ID
- Click to open the server in the Pterodactyl admin panel at https://panel.pocketburrito.ca/admin/servers/{id}
- Verify server configuration matches the service plan

## Error Cases

### Server Not Provisioned
- Service is active but no Pterodactyl server was created (provisioning failed)
- Admin must manually provision the server or trigger re-provisioning

### Mismatched Configuration
- Service plan shows 6GB RAM but Pterodactyl server has 4GB
- Admin must update the Pterodactyl server to match the service plan

### Customer Dispute
- Customer contacts support claiming wrong plan or pricing
- Admin reviews service details, invoices, and ConfigOption selections to resolve

## Success Criteria
- All customer services are visible and searchable in the admin panel
- Service details accurately reflect the customer's purchase
- Status changes propagate to Pterodactyl (suspend stops server, unsuspend starts server)
- Service properties can be edited and changes take effect
- Admin can navigate between Paymenter service and Pterodactyl server seamlessly

## Related Workflows
- [06-server-provisioning.md](06-server-provisioning.md)
- [21-admin-manage-invoices.md](21-admin-manage-invoices.md)
- [22-admin-manage-users.md](22-admin-manage-users.md)
- [26-admin-suspend-service.md](26-admin-suspend-service.md)
- [27-admin-terminate-service.md](27-admin-terminate-service.md)

## Test Scenarios
1. **View All Services:** Navigate to services list -> All customer services displayed
2. **Filter by Status:** Filter to "Active" -> Only active services shown
3. **Search Customer:** Search by customer email -> Matching services displayed
4. **View Service Detail:** Click a service -> Full details including Pterodactyl server info
5. **Activate Pending:** Activate a pending service -> Server provisioned in Pterodactyl
6. **Suspend Service:** Suspend an active service -> Pterodactyl server stopped
7. **Unsuspend Service:** Unsuspend -> Server restarts, customer can access
8. **Edit Billing:** Change next due date -> New date reflected in service detail
9. **Linked Server:** Click Pterodactyl server link -> Opens correct server in panel admin
10. **Failed Provisioning:** Service active but no server -> Admin can identify and fix

---
**Status:** Documented | Testing Pending
