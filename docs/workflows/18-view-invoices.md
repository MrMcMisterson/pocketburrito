# User Workflow: View and Pay Invoices

## Overview
Customer views their billing invoices and makes payments through the Paymenter billing portal.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/invoices (or via dashboard navigation)
- **From:** Billing dashboard sidebar or navigation menu

## Prerequisites
- User is logged into https://billing.pocketburrito.ca
- User has at least one invoice (generated from a service purchase or recurring billing)

## Steps

### 1. Navigate to Invoices
- Log in to https://billing.pocketburrito.ca
- Click "Invoices" in the navigation sidebar or dashboard menu
- The invoices list page displays all invoices for the account

### 2. View Invoice List
- Invoices are listed with:
  - **Invoice Number/ID**
  - **Date Created**
  - **Due Date**
  - **Total Amount**
  - **Status:** Paid, Unpaid, Overdue, Cancelled
- Invoices are sorted by date (most recent first)
- Unpaid/overdue invoices are highlighted

### 3. View Invoice Details
- Click on an invoice to open the detail view
- Invoice detail shows:
  - Invoice number and dates
  - Billing address
  - Line items (product name, plan, quantity, amount)
  - Subtotal, taxes (if applicable), and total
  - Payment status
  - Payment method used (if paid)

### 4. Pay an Unpaid Invoice
- On an unpaid invoice, click the "Pay Now" button
- Select a payment method (configured payment gateway)
- Complete the payment through the payment processor
- Upon successful payment:
  - Invoice status updates to "Paid"
  - Associated service is activated or renewed
  - Payment confirmation is displayed

### 5. Download Invoice
- On the invoice detail page, click "Download" or "Print" to get a PDF copy
- The PDF includes all invoice details for record-keeping

## Invoice Lifecycle
1. **Generated:** Invoice created when a service is ordered or a recurring billing cycle begins
2. **Unpaid:** Payment has not yet been received
3. **Paid:** Payment successfully processed
4. **Overdue:** Due date has passed without payment (service may be suspended)
5. **Cancelled:** Invoice voided by admin

## Error Cases

### Payment Failed
- Payment processor declines the transaction
- Error message displayed (insufficient funds, card declined, etc.)
- Invoice remains Unpaid
- User should try a different payment method or contact their bank

### No Payment Methods Available
- If no payment gateway is configured or available
- User cannot complete payment
- Contact support for assistance

### Overdue Invoice
- Service may be automatically suspended after the grace period
- User must pay the overdue invoice to reactivate the service

### Invoice Not Found
- Navigating to a non-existent invoice ID shows a 404 or error page

## Success Criteria
- Invoice list accurately shows all user invoices with correct statuses
- Invoice details match the ordered products and prices
- Payment completes successfully and invoice status updates to Paid
- Paid invoices correctly activate or renew the associated service
- Invoice PDF can be downloaded

## Related Workflows
- [04-checkout.md](04-checkout.md)
- [07-view-my-servers.md](07-view-my-servers.md)
- [19-submit-ticket.md](19-submit-ticket.md)
- [29-user-profile.md](29-user-profile.md)

## Test Scenarios
1. **View Invoice List:** Log in with active services -> Invoices page shows all invoices
2. **View Invoice Detail:** Click an invoice -> Full details displayed with line items
3. **Pay Invoice:** Click "Pay Now" on unpaid invoice -> Complete payment -> Status becomes Paid
4. **Recurring Invoice:** Wait for billing cycle -> New invoice auto-generated -> Appears in list
5. **Payment Failure:** Use a declined payment method -> Error shown -> Invoice remains Unpaid
6. **Overdue Invoice:** Let invoice pass due date -> Status becomes Overdue
7. **Download PDF:** Click download on invoice -> PDF saved with correct details
8. **Empty State:** New user with no invoices -> Appropriate empty message
9. **Multiple Invoices:** User with multiple services -> Each service generates separate invoices
10. **Post-Payment Service:** Pay overdue invoice -> Associated service reactivated

---
**Status:** Documented | Testing Pending
