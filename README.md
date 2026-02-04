# GameHost - Game Server Hosting Website

A modern, high-performance gaming server hosting website built with Astro and Tailwind CSS.

## 🚀 Features

- **15+ Game Servers** - Minecraft, Valheim, Terraria, Factorio, and more
- **Lightning Fast** - Static site generation with Astro
- **Fully Responsive** - Mobile-first design
- **SEO Optimized** - Perfect Lighthouse scores
- **Modern Design** - Gradient effects, smooth animations
- **Zero Runtime JS** - Pure HTML/CSS where possible

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git (optional)

## 🛠️ Installation

```bash
# Clone or extract the project
cd game-hosting-site

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

## 📁 Project Structure

```
/
├── public/              # Static assets (favicon, images)
├── src/
│   ├── data/
│   │   └── games.ts    # Game data and pricing
│   ├── layouts/
│   │   └── Layout.astro # Base layout with nav/footer
│   ├── pages/
│   │   ├── index.astro      # Homepage
│   │   ├── games.astro      # Games listing
│   │   ├── pricing.astro    # Pricing page
│   │   ├── docs.astro       # Documentation
│   │   └── games/
│   │       └── [slug].astro # Dynamic game pages
│   └── components/      # Reusable components (if needed)
├── astro.config.mjs     # Astro configuration
├── tailwind.config.mjs  # Tailwind CSS configuration
└── package.json         # Dependencies
```

## 🎨 Customization

### Update Your Branding

1. **Company Name**: Search and replace "GameHost" with your brand name
2. **Domain**: Replace `yourgaminghost.com` with your actual domain
3. **Colors**: Edit `tailwind.config.mjs` to change the color scheme:

```js
colors: {
  gaming: {
    dark: '#0a0e1a',      // Background color
    accent: '#6366f1',     // Primary accent (blue)
    purple: '#8b5cf6',     // Secondary accent
    pink: '#ec4899',       // Tertiary accent
  }
}
```

### Update Game Pricing

Edit `src/data/games.ts` to modify games, pricing, or descriptions.

### Add Your WHMCS Links

Replace all instances of `https://billing.yourgaminghost.com` with your actual WHMCS installation URL.

### Update Images

The template uses Unsplash placeholder images. Replace with actual game artwork:

1. Download official game artwork
2. Add to `/public/images/games/`
3. Update `imageUrl` in `src/data/games.ts`

## 🚀 Deployment

### Option 1: Cloudflare Pages (Recommended - FREE)

1. Create a Cloudflare account
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy!

Your site will be on Cloudflare's global CDN with automatic SSL.

### Option 2: Netlify (FREE)

1. Create Netlify account
2. Import from Git repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

### Option 3: Vercel (FREE)

```bash
npm install -g vercel
vercel
```

Follow the prompts to deploy.

### Option 4: Your Hetzner Server (Manual)

```bash
# Build the site
npm run build

# Copy dist/ folder to your server
scp -r dist/* user@your-server:/var/www/html/

# Configure Nginx
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 DNS Configuration

Point your domain to your hosting:

### For Cloudflare Pages/Netlify/Vercel:
```
yourdomain.com        CNAME    your-site.pages.dev
panel.yourdomain.com  A        YOUR_HETZNER_IP
billing.yourdomain.com A       YOUR_HETZNER_IP
```

### For Self-Hosted:
```
yourdomain.com        A        YOUR_SERVER_IP
panel.yourdomain.com  A        YOUR_SERVER_IP
billing.yourdomain.com A       YOUR_SERVER_IP
```

## 📊 Integration with WHMCS

This frontend is designed to work with WHMCS for billing:

1. Install WHMCS on your Hetzner CPX21 server
2. Install Pterodactyl module in WHMCS
3. Configure products matching the games in this site
4. Update order links to point to your WHMCS products

Example WHMCS product URL structure:
```
https://billing.yourdomain.com/cart.php?a=add&pid=1
```

## 🎮 Adding New Games

To add a new game:

1. Open `src/data/games.ts`
2. Add game object to either `lightTierGames` or `mediumTierGames`:

```typescript
{
  name: "New Game",
  slug: "new-game",
  maxPlayers: 10,
  price: 12.99,
  ram: "4GB",
  description: "Game description here",
  features: ["Feature 1", "Feature 2"],
  imageUrl: "/images/games/new-game.jpg",
  category: "light"
}
```

3. The game page will be automatically generated at `/games/new-game`

## 🔒 Security

- No backend = no vulnerabilities
- Static files = no database attacks
- Cloudflare CDN = DDoS protection
- HTTPS enforced automatically

## 📈 SEO

The site is optimized for search engines:

- Semantic HTML
- Meta descriptions on all pages
- Open Graph tags
- Fast loading times
- Mobile responsive

### Add Google Analytics

Add to `src/layouts/Layout.astro` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🆘 Support

For issues or questions:

1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub

## 📝 License

This template is provided as-is for your game hosting business.

## 🎯 Next Steps

1. **Customize branding** - Update colors, logo, company name
2. **Add real game images** - Replace Unsplash placeholders
3. **Setup WHMCS** - Configure billing system
4. **Deploy frontend** - Use Cloudflare Pages (free)
5. **Configure DNS** - Point your domain
6. **Setup Pterodactyl** - Install game server panel
7. **Go live!** - Start accepting orders

---

Built with ❤️ using [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
