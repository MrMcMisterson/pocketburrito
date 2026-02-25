# Admin Workflow: View and Respond to Support Tickets

## Overview
Admin views and responds to customer support tickets submitted through the Paymenter billing portal.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/admin/tickets (or similar admin route)
- **From:** Paymenter admin sidebar under "Tickets" or "Support"

## Prerequisites
- Admin is logged into https://billing.pocketburrito.ca/admin

## Steps

### 1. Navigate to Tickets
- Click "Tickets" or "Support" in the admin sidebar
- The ticket list displays all customer tickets

### 2. View Ticket List
- Each ticket shows:
  - Ticket ID/number
  - Subject
  - Customer name and email
  - Department/category (if configured)
  - Priority (if set)
  - Status: Open, Answered, Customer Reply, Closed
  - Last updated date
- Filter by status to prioritize (e.g., "Open" or "Customer Reply" for items needing attention)
- Search by ticket number, subject, or customer email

### 3. Open a Ticket
- Click on a ticket to view the full conversation thread
- The thread shows:
  - Original message from the customer
  - All subsequent replies (customer and admin) in chronological order
  - Timestamps on each message
  - File attachments (if any)
  - Related service (if linked)

### 4. Respond to a Ticket
- Type a reply in the response field at the bottom of the ticket
- Include helpful information:
  - Steps to resolve the issue
  - Links to relevant documentation or settings
  - Questions for clarification
- Optionally attach files (screenshots, logs)
- Click "Reply" or "Send"
- Ticket status automatically changes to "Answered"
- Customer receives an email notification (if configured)

### 5. Add Internal Notes
- Some ticketing systems support internal/private notes visible only to staff
- Use for documenting investigation steps or leaving context for other admins
- Internal notes are not visible to the customer

### 6. Change Ticket Status
- Manually update the status:
  - **Open:** Awaiting initial response
  - **Answered:** Admin has replied, waiting for customer
  - **Customer Reply:** Customer has responded, needs attention
  - **On Hold:** Temporarily paused (e.g., waiting for external resolution)
  - **Closed:** Issue resolved

### 7. Close a Ticket
- Click "Close Ticket" when the issue is resolved
- Customer can typically reopen by replying
- Closed tickets remain in the list for reference

### 8. Assign Ticket (if supported)
- Assign the ticket to a specific admin/staff member
- Useful for routing specialized issues (billing vs. technical)

## Error Cases

### Reply Failed
- Network error during reply submission
- Admin should retry; draft may be lost if not saved

### Customer Cannot See Reply
- Email notification fails to deliver
- Customer should check their ticket on the portal directly

### Spam Tickets
- Automated or spam ticket submissions
- Admin should close and mark as spam if the feature exists

## Success Criteria
- All tickets are visible and searchable in the admin panel
- Ticket conversations display in correct chronological order
- Admin replies are delivered to the customer (via portal and email)
- Status transitions correctly reflect the ticket state
- Closed tickets are accessible for historical reference
- Attachments are viewable and downloadable

## Related Workflows
- [19-submit-ticket.md](19-submit-ticket.md)
- [20-admin-manage-services.md](20-admin-manage-services.md)
- [22-admin-manage-users.md](22-admin-manage-users.md)

## Test Scenarios
1. **View All Tickets:** Navigate to admin tickets -> All customer tickets listed
2. **Filter Open:** Filter by "Open" -> Only unresponded tickets shown
3. **Filter Customer Reply:** Filter by "Customer Reply" -> Tickets needing attention shown
4. **View Thread:** Open a ticket -> Full conversation thread displayed
5. **Reply to Ticket:** Type reply and send -> Status changes to "Answered" -> Customer sees reply
6. **Attachment:** Open ticket with attachment -> File is viewable/downloadable
7. **Close Ticket:** Close a resolved ticket -> Status becomes "Closed"
8. **Customer Reopens:** Customer replies to closed ticket -> Status changes to "Customer Reply"
9. **Search Ticket:** Search by customer email -> Matching tickets found
10. **Related Service:** Ticket linked to a service -> Admin can navigate to service details

---
**Status:** Documented | Testing Pending
