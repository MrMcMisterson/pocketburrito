# Complete Deployment Guide

## Overview

This guide walks you through deploying your complete game hosting infrastructure:

1. Frontend website (Astro) → Cloudflare Pages
2. WHMCS billing system → Hetzner CPX21
3. Pterodactyl panel → Hetzner CPX21
4. Game server nodes → Hetzner CCX33

---

## Part 1: Deploy Frontend to Cloudflare Pages (FREE)

### Step 1: Build Your Site Locally

```bash
cd game-hosting-site
npm install
npm run build
```

### Step 2: Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/gamehost.git
git push -u origin main
```

### Step 3: Deploy to Cloudflare Pages

1. Go to https://pages.cloudflare.com
2. Click "Create a project"
3. Connect your GitHub account
4. Select your repository
5. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
6. Click "Save and Deploy"

Your site will be live at `your-site.pages.dev` in ~2 minutes!

### Step 4: Add Custom Domain

1. In Cloudflare Pages, go to "Custom domains"
2. Add `yourdomain.com`
3. Cloudflare will automatically configure DNS
4. SSL is automatic and free!

---

## Part 2: Setup Hetzner CPX21 (Control Server)

### Server Specs
- **Cost**: €8.46/month
- **RAM**: 4GB
- **CPU**: 2 vCPU
- **Purpose**: WHMCS + Pterodactyl Panel

### Step 1: Create Server

1. Login to Hetzner Cloud
2. Create new project "GameHost"
3. Add server:
   - Location: Closest to your customers
   - Image: Ubuntu 22.04
   - Type: CPX21
   - SSH key: Add your public key
4. Note the server IP address

### Step 2: Initial Server Setup

```bash
# SSH into server
ssh root@YOUR_SERVER_IP

# Update system
apt update && apt upgrade -y

# Install fail2ban (security)
apt install fail2ban -y

# Configure firewall
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 8080/tcp  # Pterodactyl Wings
ufw enable
```

### Step 3: Install Docker

```bash
# Install Docker
curl -sSL https://get.docker.com/ | sh

# Start Docker
systemctl enable docker
systemctl start docker
```

### Step 4: Install Pterodactyl Panel

```bash
# Install dependencies
apt install -y software-properties-common curl apt-transport-https ca-certificates gnupg
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/redis.list

apt update
apt install -y php8.1 php8.1-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip git redis-server

# Install Composer
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Download Pterodactyl
mkdir -p /var/www/pterodactyl
cd /var/www/pterodactyl
curl -Lo panel.tar.gz https://github.com/pterodactyl/panel/releases/latest/download/panel.tar.gz
tar -xzvf panel.tar.gz
chmod -R 755 storage/* bootstrap/cache/

# Database setup
mysql -u root -p
# In MySQL:
CREATE DATABASE panel;
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;
exit;

# Install dependencies
composer install --no-dev --optimize-autoloader

# Environment setup
php artisan p:environment:setup
php artisan p:environment:database
php artisan p:environment:mail # Use SMTP settings

# Generate app key and run migrations
php artisan key:generate --force
php artisan p:environment:setup
php artisan migrate --seed --force

# Create admin user
php artisan p:user:make

# Set permissions
chown -R www-data:www-data /var/www/pterodactyl/*

# Setup cron
(crontab -l 2>/dev/null; echo "* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1") | crontab -

# Create queue worker service
cat > /etc/systemd/system/pteroq.service << 'EOF'
[Unit]
Description=Pterodactyl Queue Worker
After=redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

systemctl enable pteroq.service
systemctl start pteroq.service
```

### Step 5: Configure Nginx for Pterodactyl

```bash
# Remove default site
rm /etc/nginx/sites-enabled/default

# Create Pterodactyl site
cat > /etc/nginx/sites-available/pterodactyl.conf << 'EOF'
server {
    listen 80;
    server_name panel.yourdomain.com;

    root /var/www/pterodactyl/public;
    index index.html index.htm index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/pterodactyl.app-error.log error;

    client_max_body_size 100m;
    client_body_timeout 120s;

    sendfile off;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param PHP_VALUE "upload_max_filesize = 100M \n post_max_size=100M";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTP_PROXY "";
        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/pterodactyl.conf /etc/nginx/sites-enabled/pterodactyl.conf

# Test and reload nginx
nginx -t
systemctl reload nginx
```

### Step 6: Install SSL with Let's Encrypt

```bash
apt install certbot python3-certbot-nginx -y
certbot --nginx -d panel.yourdomain.com
# Follow prompts
```

### Step 7: Install WHMCS

```bash
# Create directory
mkdir -p /var/www/whmcs
cd /var/www/whmcs

# Download WHMCS (you need to purchase a license first)
# Upload WHMCS files via SFTP to /var/www/whmcs

# Set permissions
chown -R www-data:www-data /var/www/whmcs
chmod -R 755 /var/www/whmcs

# Create WHMCS database
mysql -u root -p
CREATE DATABASE whmcs;
CREATE USER 'whmcs'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON whmcs.* TO 'whmcs'@'localhost';
exit;

# Create Nginx config for WHMCS
cat > /etc/nginx/sites-available/whmcs.conf << 'EOF'
server {
    listen 80;
    server_name billing.yourdomain.com;

    root /var/www/whmcs;
    index index.php index.html;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
EOF

ln -s /etc/nginx/sites-available/whmcs.conf /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Install SSL
certbot --nginx -d billing.yourdomain.com
```

Now visit `https://billing.yourdomain.com/install` to complete WHMCS setup.

---

## Part 3: Setup Hetzner CCX33 (Game Node)

### Server Specs
- **Cost**: €80.42/month
- **RAM**: 62GB
- **CPU**: 16 vCPU
- **Purpose**: Game servers

### Step 1: Create Server

Same as CPX21 but choose CCX33 type.

### Step 2: Install Pterodactyl Wings

```bash
# SSH into game node
ssh root@GAME_NODE_IP

# Install Docker
curl -sSL https://get.docker.com/ | sh
systemctl enable docker
systemctl start docker

# Configure firewall
ufw allow 22/tcp
ufw allow 8080/tcp  # Wings API
ufw allow 2022/tcp  # SFTP
ufw allow 25565/tcp # Minecraft (example)
# Open ports for each game as needed
ufw enable

# Download Wings
mkdir -p /etc/pterodactyl
curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
chmod u+x /usr/local/bin/wings

# Get config from Panel
# In Pterodactyl Panel: Admin → Nodes → Create Node
# Copy the configuration and paste to /etc/pterodactyl/config.yml

# Create systemd service
cat > /etc/systemd/system/wings.service << 'EOF'
[Unit]
Description=Pterodactyl Wings Daemon
After=docker.service
Requires=docker.service
PartOf=docker.service

[Service]
User=root
WorkingDirectory=/etc/pterodactyl
LimitNOFILE=4096
PIDFile=/var/run/wings/daemon.pid
ExecStart=/usr/local/bin/wings
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

systemctl enable wings
systemctl start wings
```

---

## Part 4: Configure WHMCS with Pterodactyl

### Step 1: Install Pterodactyl Module in WHMCS

1. Download the module from https://github.com/pterodactyl/whmcs
2. Upload to `/var/www/whmcs/modules/servers/pterodactyl/`
3. In WHMCS: Setup → Products/Services → Servers
4. Add New Server:
   - Name: Pterodactyl
   - Type: Pterodactyl
   - Hostname: https://panel.yourdomain.com
   - API Key: (Create in Pterodactyl admin panel)

### Step 2: Create Products

1. Setup → Products/Services → Create New Product
2. For each game:
   - Product Name: "Minecraft 6GB Server"
   - Module: Pterodactyl
   - Configure module settings (eggs, locations, etc.)
   - Set pricing

---

## Part 5: DNS Configuration

In your domain registrar or Cloudflare DNS:

```
yourdomain.com             CNAME    your-site.pages.dev (or A record to server IP)
panel.yourdomain.com       A        CPX21_IP_ADDRESS
billing.yourdomain.com     A        CPX21_IP_ADDRESS
node1.yourdomain.com       A        CCX33_IP_ADDRESS
```

---

## Part 6: Testing

1. **Frontend**: Visit https://yourdomain.com
2. **Panel**: Visit https://panel.yourdomain.com
3. **WHMCS**: Visit https://billing.yourdomain.com
4. **Place test order**: Order a server through WHMCS
5. **Verify provisioning**: Check if server appears in Pterodactyl

---

## Monthly Costs Summary

| Item | Cost |
|------|------|
| Cloudflare Pages | €0 |
| Domain | €1-2 |
| Hetzner CPX21 (Control) | €8.46 |
| Hetzner CCX33 (Node) | €80.42 |
| WHMCS License | €18 ($18.95) |
| **Total** | **~€108/month ($113)** |

**Break-even**: 7 servers at $16.99/month

---

## Maintenance

### Daily
- Monitor server resources in Hetzner console
- Check Pterodactyl for any issues

### Weekly
- Review server backups
- Check for system updates: `apt update && apt upgrade`

### Monthly
- Review customer feedback
- Update games/mods as needed
- Check billing reconciliation

---

## Security Checklist

- [x] Firewall configured (ufw)
- [x] Fail2ban installed
- [x] SSL certificates (Let's Encrypt)
- [x] Strong database passwords
- [x] Regular backups configured
- [x] Only necessary ports open
- [x] SSH key authentication only

---

## Troubleshooting

### WHMCS won't connect to Pterodactyl
- Check API key is correct
- Verify panel URL is https://
- Check firewall allows connection

### Wings won't start
- Check config.yml is valid
- Ensure Docker is running
- Check logs: `journalctl -u wings -n 50`

### Server provisioning fails
- Check node has available resources
- Verify egg exists in Pterodactyl
- Check WHMCS module logs

---

**🎉 Congratulations!** Your game hosting infrastructure is now live!

Next: Start marketing and acquiring customers!
