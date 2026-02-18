# PocketBurrito - Game Server Hosting

Premium game server hosting with instant setup, DDoS protection, and 24/7 support. Host Minecraft, Valheim, Terraria, and 13+ more games.

**Live at:** [pocketburrito.ca](https://pocketburrito.ca)

## Architecture

| Component | URL | Technology |
|-----------|-----|------------|
| Public website | pocketburrito.ca | Astro + Tailwind CSS (Cloudflare Pages) |
| Billing & checkout | billing.pocketburrito.ca | Paymenter v2 (custom theme) |
| Game panel | panel.pocketburrito.ca | Pterodactyl |
| Server | 5.78.100.72 | Ubuntu 24.04, Nginx, PHP 8.3, MySQL |

Users browse games on pocketburrito.ca and are sent to billing.pocketburrito.ca only for checkout and account management. Nginx redirects prevent direct access to Paymenter's public pages.

## Games (16)

**Survival:** Minecraft, Valheim, Palworld, Project Zomboid, Enshrouded, 7 Days to Die, Sons of the Forest, Rust, ARK: Survival Evolved, V Rising

**Sandbox:** Terraria, Satisfactory, Factorio, Core Keeper, ECO, Garry's Mod

Plans range from $6.99/month to $32.99/month depending on game and tier.

## Project Structure

```
├── src/
│   ├── data/games.ts           # Game definitions, tiers, pricing
│   ├── layouts/Layout.astro    # Shared nav + footer
│   └── pages/
│       ├── index.astro         # Homepage
│       ├── games.astro         # Games listing
│       ├── games/[slug].astro  # Individual game pages
│       ├── pricing.astro       # Pricing comparison
│       └── docs.astro          # Documentation
├── public/images/games/        # Game header images
├── eggs/                       # Pterodactyl egg JSONs
├── themes/pocketburrito/       # Paymenter Blade theme
├── scripts/                    # Server maintenance scripts
├── docs/
│   ├── PROJECT_STATUS.md       # Full project history & status
│   └── maintenance/            # Security audit, issue tracking
├── CLAUDE.md                   # Claude Code context for future sessions
└── astro.config.mjs            # Site: https://pocketburrito.ca
```

## Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Build to dist/
```

## Deployment

**Frontend:** Push to `main` branch. Cloudflare Pages auto-deploys.

**Paymenter theme:** Use the deploy script on the server:
```bash
ssh rpuderak@5.78.100.72 "bash /home/rpuderak/deploy-theme.sh"
```

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Context for Claude Code sessions (credentials, architecture, common tasks)
- [docs/PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) - Complete project history, current status, and remaining work
- [docs/maintenance/SECURITY_AUDIT_LOG.md](./docs/maintenance/SECURITY_AUDIT_LOG.md) - Server security audit results
- [scripts/](./scripts/) - Server maintenance and security fix scripts

## GitHub Issues

Project is tracked via GitHub Issues with epics (#1, #5, #9, #13, #17, #20, #24) and stories. See [docs/PROJECT_STATUS.md](./docs/PROJECT_STATUS.md) for full status breakdown.

---

Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
