# Admin Workflow: Manage Invoices

## Overview
Admin views, edits, and manages customer invoices through the Paymenter admin panel, including marking invoices as paid, creating manual invoices, and handling billing disputes.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/admin/invoices (or similar admin route)
- **From:** Paymenter admin sidebar under "Invoices" or "Billing"

## Prerequisites
- Admin is logged into https://billing.pocketburrito.ca/admin

## Steps

### 1. Navigate to Invoices
- Click "Invoices" in the admin sidebar
- The invoice list displays all invoices across all customers

### 2. View Invoice List
- Each invoice shows:
  - Invoice ID/number
  - Customer name and email
  - Total amount
  - Status: Paid, Unpaid, Overdue, Cancelled
  - Created date and due date
- Filter invoices by status, date range, or customer
- Search by invoice number or customer email

### 3. View Invoice Details
- Click an invoice to open the detail view
- Details include:
  - Customer billing information
  - Line items with product names, plans, quantities, and amounts
  - Subtotal, taxes, discounts, and total
  - Payment history (date paid, method, transaction ID)
  - Notes or internal comments

### 4. Mark Invoice as Paid
- On an unpaid invoice, click "Mark as Paid" or similar action
- Optionally record the payment method and transaction reference
- Invoice status changes to Paid
- Associated service is activated or renewed if it was pending payment
- Useful for manual/offline payments (bank transfer, cash, etc.)

### 5. Create Manual Invoice
- Click "Create Invoice" or equivalent
- Select the customer from a dropdown or search
- Add line items:
  - Description, quantity, unit price
  - Or link to an existing product/service
- Set due date
- Save the invoice
- The invoice appears in the customer's billing portal as Unpaid

### 6. Edit an Invoice
- Open an existing invoice
- Modify line items, amounts, or due date
- Add or remove discount
- Save changes
- Changes reflect in the customer's view

### 7. Cancel an Invoice
- Open the invoice
- Click "Cancel" or "Void"
- Invoice status changes to Cancelled
- If the invoice was associated with a pending service, that service may also be cancelled

### 8. Refund a Paid Invoice
- Open a paid invoice
- Click "Refund" (if supported by the payment gateway)
- Specify full or partial refund amount
- The refund is processed through the payment gateway
- Invoice status may update to reflect the refund

## Error Cases

### Payment Gateway Refund Failed
- The refund request is declined by the payment processor
- Admin must process the refund manually through the payment gateway dashboard

### Invoice Linked to Active Service
- Cancelling an invoice linked to an active service may not automatically cancel the service
- Admin should manage the service status separately

### Duplicate Invoices
- Recurring billing may generate duplicate invoices if timing overlaps
- Admin should cancel the duplicate and verify billing cycle settings

## Success Criteria
- All invoices are visible and searchable in the admin panel
- Invoice details are accurate and match customer purchases
- Marking as paid updates the invoice status and activates associated services
- Manual invoices appear in the customer's billing portal
- Invoice edits persist and reflect in customer view
- Cancelled invoices no longer require payment

## Related Workflows
- [18-view-invoices.md](18-view-invoices.md)
- [20-admin-manage-services.md](20-admin-manage-services.md)
- [22-admin-manage-users.md](22-admin-manage-users.md)
- [30-coupon-codes.md](30-coupon-codes.md)

## Test Scenarios
1. **View All Invoices:** Navigate to invoices -> All customer invoices listed
2. **Filter Unpaid:** Filter by "Unpaid" status -> Only unpaid invoices shown
3. **Search by Customer:** Search customer email -> Matching invoices displayed
4. **View Detail:** Click invoice -> Full details with line items and payment history
5. **Mark Paid:** Mark unpaid invoice as paid -> Status becomes Paid -> Service activated
6. **Create Manual Invoice:** Create invoice for a customer -> Appears in their billing portal
7. **Edit Invoice:** Change line item amount -> New total reflected
8. **Cancel Invoice:** Cancel an unpaid invoice -> Status becomes Cancelled
9. **Refund Invoice:** Refund a paid invoice -> Refund processed, status updated
10. **Overdue Detection:** Invoice past due date -> Status automatically becomes Overdue

---
**Status:** Documented | Testing Pending
