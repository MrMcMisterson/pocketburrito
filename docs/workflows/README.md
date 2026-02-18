# PocketBurrito Workflow Documentation

Complete workflow documentation for all user and admin processes on the PocketBurrito platform.

## User Workflows

| # | Workflow | Description |
|---|---------|-------------|
| 01 | [User Registration](01-user-registration.md) | Creating a new account on billing.pocketburrito.ca |
| 02 | [User Login](02-user-login.md) | Logging into the billing portal |
| 03 | [Browse Products](03-browse-products.md) | Browsing game servers on pocketburrito.ca |
| 04 | [Checkout](04-checkout.md) | Purchasing a game server with payment processing |
| 05 | [Shopping Cart](05-shopping-cart.md) | Managing cart items (if direct checkout disabled) |
| 06 | [Server Provisioning](06-server-provisioning.md) | How servers are automatically created after payment |
| 07 | [View My Servers](07-view-my-servers.md) | Viewing and accessing game servers |
| 08 | [Server Console](08-server-console.md) | Using the live server console |
| 09 | [Server File Manager](09-server-file-manager.md) | Managing server files |
| 10 | [Server Databases](10-server-databases.md) | Creating and managing databases |
| 11 | [Password Reset](11-password-reset.md) | Resetting a forgotten password |
| 12 | [Logout](12-user-logout.md) | Logging out of billing and panel |
| 13 | [Server Power Controls](13-server-power-controls.md) | Start, stop, restart, kill |
| 14 | [Server Backups](14-server-backups.md) | Creating and restoring backups |
| 15 | [Server Schedules](15-server-schedules.md) | Automated tasks (restart, backup) |
| 16 | [Server Settings](16-server-settings.md) | Startup parameters and reinstallation |
| 17 | [Server Sub-Users](17-server-subusers.md) | Adding sub-users with permissions |
| 18 | [View Invoices](18-view-invoices.md) | Viewing and paying invoices |
| 19 | [Submit Ticket](19-submit-ticket.md) | Submitting a support ticket |
| 28 | [Server Reinstall](28-server-reinstall.md) | Reinstalling a server |
| 29 | [User Profile](29-user-profile.md) | Managing profile and billing details |
| 30 | [Coupon Codes](30-coupon-codes.md) | Applying promotional codes |

## Admin Workflows

| # | Workflow | Description |
|---|---------|-------------|
| 20 | [Manage Services](20-admin-manage-services.md) | Managing customer services |
| 21 | [Manage Invoices](21-admin-manage-invoices.md) | Viewing/editing invoices, marking paid |
| 22 | [Manage Users](22-admin-manage-users.md) | Managing user accounts |
| 23 | [Manage Products](23-admin-manage-products.md) | Managing products, plans, ConfigOptions |
| 24 | [Pterodactyl Servers](24-admin-pterodactyl-servers.md) | Managing servers in Pterodactyl admin |
| 25 | [Support Tickets](25-admin-view-tickets.md) | Viewing and responding to tickets |
| 26 | [Suspend Service](26-admin-suspend-service.md) | Suspending a customer's service |
| 27 | [Terminate Service](27-admin-terminate-service.md) | Terminating a service |

## Architecture Reference

```
pocketburrito.ca (Cloudflare Pages)     billing.pocketburrito.ca (Paymenter v2)
       |                                          |
       |  User browses games                      |  Checkout, auth, services, tickets
       |  /games, /games/{slug}                   |  /products/game-servers/{slug}/checkout
       |                                          |
       +--- "Order Now" -------------------------+
                                                  |
                                          panel.pocketburrito.ca (Pterodactyl)
                                                  |
                                          Game servers provisioned automatically
```

## Key URLs

| URL | Purpose |
|-----|---------|
| https://pocketburrito.ca | Public website (Astro) |
| https://pocketburrito.ca/games | Game server listing |
| https://pocketburrito.ca/games/{slug} | Individual game detail + pricing |
| https://billing.pocketburrito.ca/login | Customer login |
| https://billing.pocketburrito.ca/register | Customer registration |
| https://billing.pocketburrito.ca/products/game-servers/{slug}/checkout | Checkout page |
| https://billing.pocketburrito.ca/admin | Paymenter admin panel |
| https://panel.pocketburrito.ca | Pterodactyl panel (server management) |
| https://panel.pocketburrito.ca/admin | Pterodactyl admin panel |
