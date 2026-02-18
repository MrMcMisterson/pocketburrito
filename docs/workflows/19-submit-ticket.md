# User Workflow: Submit Support Ticket

## Overview
Customer submits a support ticket through the Paymenter billing portal to request help with billing, server issues, or general inquiries.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/tickets/create
- **From:** Navigation menu "Support" or "Tickets", or dashboard "Open Ticket" button

## Prerequisites
- User is logged into https://billing.pocketburrito.ca

## Steps

### 1. Navigate to Ticket Creation
- Click "Tickets" or "Support" in the billing portal navigation
- Click "Create Ticket" or "Open New Ticket" button
- The ticket creation form loads at https://billing.pocketburrito.ca/tickets/create

### 2. Fill in Ticket Details
- **Subject:** Brief description of the issue (required)
- **Department/Category:** Select the relevant category (if configured), e.g., Technical Support, Billing, General
- **Priority:** Select urgency level (Low, Medium, High) if available
- **Related Service:** Select the affected service from a dropdown of active services (optional)
- **Message:** Detailed description of the issue or request (required)
  - Include relevant details: error messages, server name, steps to reproduce
  - Rich text or markdown formatting may be supported

### 3. Attach Files (Optional)
- Click "Attach File" or drag and drop files
- Useful for screenshots of errors, log files, or configuration files
- File size limits apply (typically 10MB per file)

### 4. Submit Ticket
- Click "Submit" or "Open Ticket"
- Ticket is created with a unique ticket number
- User is redirected to the ticket detail page
- A confirmation email may be sent to the user

### 5. View Ticket Status
- Navigate to https://billing.pocketburrito.ca/tickets
- All submitted tickets are listed with:
  - Ticket number
  - Subject
  - Status: Open, Answered, Customer Reply, Closed
  - Last updated date

### 6. Reply to a Ticket
- Open an existing ticket from the tickets list
- View the conversation thread (user messages and staff replies)
- Type a reply in the message field at the bottom
- Optionally attach additional files
- Click "Reply" to add the message
- Ticket status updates to "Customer Reply"

### 7. Close a Ticket
- If the issue is resolved, the user can close the ticket
- Click "Close Ticket" on the ticket detail page
- Closed tickets can typically be reopened by adding a new reply

## Error Cases

### Missing Required Fields
- Subject or message is empty
- Form validation prevents submission
- Error messages highlight the missing fields

### File Upload Failed
- File exceeds size limit or is an unsupported type
- Error message displayed
- Ticket can still be submitted without the attachment

### Ticket Creation Failed
- Server error during submission
- User should retry or refresh the page

## Success Criteria
- Ticket is created with a unique ID and appears in the user's ticket list
- Admin receives notification of the new ticket
- Ticket thread displays all messages in chronological order
- File attachments are accessible to both user and admin
- Status transitions work correctly (Open -> Answered -> Customer Reply -> Closed)
- Email notifications sent for ticket updates (if configured)

## Related Workflows
- [02-user-login.md](02-user-login.md)
- [18-view-invoices.md](18-view-invoices.md)
- [25-admin-view-tickets.md](25-admin-view-tickets.md)

## Test Scenarios
1. **Create Ticket:** Fill in subject and message -> Submit -> Ticket created with unique ID
2. **Select Service:** Create ticket with a related service selected -> Service linked to ticket
3. **Attach File:** Create ticket with a screenshot attachment -> File accessible in ticket view
4. **View Ticket List:** After creating tickets -> All tickets visible with correct statuses
5. **Admin Reply:** Admin replies to ticket -> User sees reply, status changes to "Answered"
6. **User Reply:** Reply to an answered ticket -> Status changes to "Customer Reply"
7. **Close Ticket:** Close a resolved ticket -> Status becomes "Closed"
8. **Reopen Ticket:** Reply to a closed ticket -> Ticket reopened
9. **Missing Fields:** Submit with empty subject -> Validation error
10. **Large Attachment:** Attach oversized file -> Error shown, can submit without attachment

---
**Status:** Documented | Testing Pending
