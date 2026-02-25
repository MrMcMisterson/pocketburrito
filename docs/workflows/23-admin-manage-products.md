# Admin Workflow: Manage Products, Plans, and ConfigOptions

## Overview
Admin manages the product catalog in Paymenter, including game server products, pricing plans, and ConfigOptions that allow customers to select different server tiers (RAM/resource levels) at checkout.

## Entry Point
- **URL:** https://billing.pocketburrito.ca/admin/products (or similar admin route)
- **From:** Paymenter admin sidebar under "Products" or "Store"

## Prerequisites
- Admin is logged into https://billing.pocketburrito.ca/admin
- Pterodactyl nests and eggs are already configured for any new game products

## PocketBurrito Product Architecture
- **Category:** "Game Servers" (slug: `game-servers`)
- **16 products** (one per game), IDs 53-68
- **15 multi-tier games** use ConfigOptions for plan selection (parent: "Server Plan" with memory env_variable, children: one per tier)
- **Valheim** is the only single-tier game with a direct plan ($14.99 recurring)
- Product base plans are "free" type; ConfigOption children carry the full price

## Steps

### 1. Navigate to Products
- Click "Products" in the admin sidebar
- The product list shows all products organized by category

### 2. View Product List
- Products grouped under "Game Servers" category
- Each product shows: name, slug, category, number of plans, status (active/hidden)
- Click a product to view/edit details

### 3. Edit a Product
- On the product detail page, editable fields include:
  - **Name:** Display name (e.g., "Minecraft Server")
  - **Slug:** URL-friendly identifier (e.g., `minecraft`)
  - **Description:** Product description shown at checkout
  - **Category:** Parent category (Game Servers)
  - **Status:** Active or Hidden
  - **Images:** Product image for the storefront

### 4. Manage Plans
- Within a product, navigate to the "Plans" section
- View existing plans with: name, price, billing cycle, type
- **Add a Plan:**
  - Click "Add Plan"
  - Set name, price, billing cycle (monthly, quarterly, annually)
  - Set type: "recurring" for paid plans, "free" for base plans on ConfigOption products
- **Edit a Plan:** Click to modify price, name, or cycle
- **Delete a Plan:** Remove a plan (may affect existing subscribers)

### 5. Manage ConfigOptions
ConfigOptions allow tier selection (e.g., 3GB, 6GB, 10GB RAM) for multi-tier products.

#### View ConfigOptions
- Navigate to ConfigOptions section (may be under product settings or a separate admin area)
- Each ConfigOption group shows:
  - Parent option: name="Server Plan", env_variable="memory", type="select"
  - Children: one per tier (e.g., "3GB RAM", "6GB RAM")

#### Add a ConfigOption Child (New Tier)
- Open the ConfigOption group for the product
- Click "Add Option" or "Add Child"
- Set:
  - **Name:** Display name (e.g., "10GB RAM - $19.99")
  - **env_variable:** The RAM value in MiB (e.g., "10240")
  - **Plan:** Create or assign a plan with the full price
- The new tier appears as a selection option at checkout

#### Edit a ConfigOption Child
- Click on an existing child option
- Update name, price (via plan), or env_variable
- Save changes

#### How ConfigOptions Work at Checkout
1. Customer selects a ConfigOption child (e.g., "6GB RAM - $12.99")
2. `ExtensionHelper::getServiceProperties()` maps parent env_variable ("memory") to child env_variable value ("6144")
3. `Pterodactyl::createServer()` uses `array_merge($settings, $properties)` to override product base memory with the selected tier's value
4. The child's plan price becomes the invoice amount

### 6. Manage Server Settings (Pterodactyl Integration)
- Each product has Pterodactyl server settings:
  - **Nest ID:** The Pterodactyl nest (game category)
  - **Egg ID:** The specific game egg
  - **Memory:** Base memory allocation (overridden by ConfigOption)
  - **Disk:** Disk space allocation
  - **CPU:** CPU limit
  - **Databases:** Number of databases allowed
  - **Backups:** Number of backups allowed
  - **Allocations:** Number of port allocations
  - **Startup Variables:** Default egg variables
- These settings determine what Pterodactyl server is created when a customer purchases the product

### 7. Add a New Product (New Game)
- Click "Create Product"
- Fill in product details (name, slug, description, category)
- Set up Pterodactyl server settings (nest_id, egg_id, resource limits)
- Create a base plan (free type for multi-tier, or priced for single-tier like Valheim)
- Create ConfigOption group with tiers (for multi-tier games)
- Activate the product
- Ensure the corresponding game page exists on pocketburrito.ca

### 8. Hide/Archive a Product
- Set product status to Hidden to remove it from the storefront
- Existing subscribers are not affected
- No new purchases can be made for hidden products

## Error Cases

### ConfigOption Price Mismatch
- If the ConfigOption child plan price does not match the displayed price
- Admin must ensure plan prices are kept in sync with any displayed pricing

### Missing Pterodactyl Settings
- Product without nest_id or egg_id will fail to provision servers
- Admin must configure all server settings before activating the product

### Egg Not Found
- If the referenced egg_id is deleted from Pterodactyl
- Server provisioning will fail for new purchases
- Admin must update the product to reference a valid egg

### Slug Collision
- Product slug must be unique
- Error if creating a product with an existing slug

## Success Criteria
- Products display correctly on the storefront at pocketburrito.ca and checkout
- Plans have correct pricing and billing cycles
- ConfigOptions present tier selection at checkout
- Selected tier correctly provisions the right server resources
- New products can be created and immediately purchasable
- Hidden products no longer appear in the storefront

## Related Workflows
- [03-browse-products.md](03-browse-products.md)
- [04-checkout.md](04-checkout.md)
- [06-server-provisioning.md](06-server-provisioning.md)
- [20-admin-manage-services.md](20-admin-manage-services.md)
- [24-admin-pterodactyl-servers.md](24-admin-pterodactyl-servers.md)

## Test Scenarios
1. **View Products:** Navigate to products -> All 16 games listed under Game Servers
2. **Edit Product:** Change Minecraft description -> Save -> Updated at checkout
3. **Add Plan:** Add a new pricing tier to an existing product -> Tier appears at checkout
4. **Edit Plan Price:** Change 6GB Minecraft plan from $12.99 to $13.99 -> New price reflected
5. **Add ConfigOption Tier:** Add "16GB RAM" tier to a game -> New option available at checkout
6. **Remove ConfigOption Tier:** Delete a tier -> No longer selectable at checkout
7. **Create New Product:** Add a new game product with full configuration -> Purchasable and provisions correctly
8. **Hide Product:** Hide a product -> Not visible on storefront -> Existing services unaffected
9. **Missing Egg:** Reference invalid egg_id -> Purchase fails to provision -> Fix egg reference
10. **Valheim Single-Tier:** Verify Valheim has direct plan pricing without ConfigOptions

---
**Status:** Documented | Testing Pending
