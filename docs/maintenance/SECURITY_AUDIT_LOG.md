# PocketBurrito Security Audit Log

**Date:** 2026-02-17
**Server:** 5.78.100.72 (Hetzner Cloud)
**OS:** Ubuntu 24.04.3 LTS, Kernel 6.8.0-94-generic
**Auditor:** Claude Code (Opus 4.6)

---

## Executive Summary

Overall security posture: **MODERATE** - Basic security is in place but several issues need attention.

| Severity | Count | Details |
|----------|-------|---------|
| CRITICAL | 2 | Root SSH login enabled, Paymenter APP_DEBUG=true |
| HIGH | 3 | .env file permissions too open, server_tokens not disabled, no backups |
| MEDIUM | 4 | Pending system updates, expose_php=On, missing security headers on Pterodactyl, port 8080 open |
| LOW | 2 | No HSTS header, Pterodactyl panel uses origin cert (Cloudflare-specific) |

---

## 3.1 System Security

| Check | Status | Notes |
|-------|--------|-------|
| OS Version | Ubuntu 24.04.3 LTS | Current LTS, supported until 2029 |
| Kernel | 6.8.0-94-generic | Recent kernel |
| Uptime | 13 days | Recently rebooted |
| Updates | 20+ packages pending | PHP, Docker, security packages need updating |

**Running Services:**
- nginx, php8.3-fpm, mariadb, redis-server (expected)
- Docker + containerd (for Pterodactyl game servers)
- fail2ban, ssh, cron (expected)
- unattended-upgrades (good - auto-updates enabled)

---

## 3.2 Access Control

| Check | Status | Severity |
|-------|--------|----------|
| PermitRootLogin | **yes** | CRITICAL |
| PasswordAuthentication | no (key-only) | GOOD |
| Sudo users | root, admin group, sudo group | OK |
| Login shells | root, rpuderak, mrdocker | OK |
| Failed logins | 18 total, 2 banned by fail2ban | OK |

**Users with shell access:** root, rpuderak, mrdocker

---

## 3.3 Firewall & Network

| Check | Status | Notes |
|-------|--------|-------|
| UFW | Active, default deny incoming | GOOD |
| Allowed ports | 22, 80, 443, 8080 | 8080 needs review |
| fail2ban | Active, sshd jail running | GOOD |
| MySQL (3306) | 127.0.0.1 only | GOOD |
| Redis (6379) | 127.0.0.1 only | GOOD |

**Port 8080** is required for Pterodactyl Wings daemon.

---

## 3.4 SSL/TLS

| Domain | Status | Expiry |
|--------|--------|--------|
| billing.pocketburrito.ca | VALID (Let's Encrypt) | 2026-05-05 (76 days) |
| panel.pocketburrito.ca | VALID (Origin cert) | Uses Cloudflare origin cert |

- Certbot auto-renewal timer is active and running
- Panel uses Cloudflare origin certificates (valid only behind CF proxy)

---

## 3.5 Web Server Security

| Check | Status | Severity |
|-------|--------|----------|
| server_tokens | **Commented out (not disabled)** | HIGH |
| X-Frame-Options | Set on billing site | GOOD |
| X-Content-Type-Options | Set on billing site | GOOD |
| Content-Security-Policy | Set on billing site | GOOD |
| HSTS | **Not set** | LOW |
| Pterodactyl security headers | **None configured** | MEDIUM |

---

## 3.6 Application Security

| Check | Status | Severity |
|-------|--------|----------|
| Paymenter APP_DEBUG | **true** | CRITICAL |
| Pterodactyl APP_DEBUG | false | GOOD |
| Paymenter APP_ENV | production | GOOD |
| Pterodactyl APP_ENV | production | GOOD |
| expose_php | **On** | MEDIUM |
| display_errors | Off | GOOD |
| allow_url_include | Off | GOOD |
| allow_url_fopen | On | OK (needed for package managers) |
| .env permissions (Paymenter) | **755 (world-readable)** | HIGH |
| .env permissions (Pterodactyl) | **755 (world-readable)** | HIGH |

---

## 3.7 Database Security

| Check | Status | Notes |
|-------|--------|-------|
| Bind address | 127.0.0.1 | GOOD - localhost only |
| Database engine | MariaDB 10.11.14 | Current stable |
| Users | root, pterodactyl, paymenter, mysql, mariadb.sys | OK |
| pterodactyl user host | 127.0.0.1 | GOOD |
| paymenter user host | localhost | GOOD |
| Auth plugin | mysql_native_password (all) | OK |

---

## 3.8 Backup Status

| Check | Status | Severity |
|-------|--------|----------|
| Backup mechanism | **None found** | HIGH |
| Root crontab | Pterodactyl scheduler only | No backup jobs |
| User crontab | None | No backup jobs |
| Backup directories | None exist | No backups |

---

## Recommended Fixes (Priority Order)

### CRITICAL
1. **Disable root SSH login** - Change `PermitRootLogin yes` to `PermitRootLogin no` in `/etc/ssh/sshd_config`
2. **Set Paymenter APP_DEBUG=false** - Currently exposes stack traces and sensitive info to users

### HIGH
3. **Fix .env file permissions** - Change from 755 to 600 (`chmod 600`)
4. **Enable server_tokens off** in nginx - Uncomment the line in `/etc/nginx/nginx.conf`
5. **Set up automated backups** - Database dumps + file backups with retention

### MEDIUM
6. **Apply pending system updates** - `apt upgrade` for PHP, Docker, and security patches
7. **Disable expose_php** - Set `expose_php = Off` in php.ini
8. **Add security headers to Pterodactyl** - X-Frame-Options, X-Content-Type-Options, CSP
9. **Review/remove port 8080** from UFW if not needed

### LOW
10. **Add HSTS header** to both nginx configs
11. **Review Cloudflare origin cert** setup for panel site
