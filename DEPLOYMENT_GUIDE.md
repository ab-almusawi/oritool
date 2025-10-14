# Oritool Deployment Guide - Ubuntu VPS with Nginx

Complete guide to deploy Oritool frontend and backend on Ubuntu server with domain https://oritool.com

## Prerequisites

- Ubuntu VPS (20.04 or 22.04)
- Domain name pointing to your VPS IP (oritool.com)
- Root or sudo access
- At least 2GB RAM recommended

## Table of Contents

1. [Initial Server Setup](#1-initial-server-setup)
2. [Install Required Software](#2-install-required-software)
3. [Setup PostgreSQL Database](#3-setup-postgresql-database)
4. [Deploy Backend (NestJS)](#4-deploy-backend-nestjs)
5. [Deploy Frontend (Vite/React)](#5-deploy-frontend-vitereact)
6. [Configure Nginx](#6-configure-nginx)
7. [Setup SSL with Let's Encrypt](#7-setup-ssl-with-lets-encrypt)
8. [Setup PM2 Process Manager](#8-setup-pm2-process-manager)
9. [Final Steps & Testing](#9-final-steps--testing)

---

## 1. Initial Server Setup

### 1.1 Connect to Your Server

```bash
ssh root@your_server_ip
# or
ssh your_username@your_server_ip
```

### 1.2 Update System Packages

```bash
sudo apt update
sudo apt upgrade -y
```

### 1.3 Create a Deploy User (Optional but Recommended)

```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
su - deploy
```

---

## 2. Install Required Software

### 2.1 Install Node.js (v20 LTS)

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version
```

### 2.2 Install PostgreSQL

```bash
sudo apt install -y postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verify installation
sudo systemctl status postgresql
```

### 2.3 Install Nginx

```bash
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Verify installation
sudo systemctl status nginx
```

### 2.4 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 2.5 Install Git

```bash
sudo apt install -y git
```

---

## 3. Setup PostgreSQL Database

### 3.1 Create Database and User

```bash
# Switch to postgres user
sudo -i -u postgres

# Access PostgreSQL prompt
psql

# Run these SQL commands:
CREATE DATABASE oritool;
CREATE USER oritool_user WITH PASSWORD 'your_secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE oritool TO oritool_user;

# For PostgreSQL 15+ (if needed)
\c oritool
GRANT ALL ON SCHEMA public TO oritool_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO oritool_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO oritool_user;

# Exit
\q
exit
```

### 3.2 Configure PostgreSQL for Remote Connections (if needed)

```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/14/main/postgresql.conf
# Change: listen_addresses = 'localhost'

# Edit pg_hba.conf
sudo nano /etc/postgresql/14/main/pg_hba.conf
# Add: host    all    all    127.0.0.1/32    md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

---

## 4. Deploy Backend (NestJS)

### 4.1 Create Project Directory

```bash
sudo mkdir -p /var/www/oritool
sudo chown -R $USER:$USER /var/www/oritool
cd /var/www/oritool
```

### 4.2 Upload Your Code

**Option A: Using Git (Recommended)**

```bash
# If you have a Git repository
git clone https://github.com/yourusername/oritool.git .

# Or upload from local machine using rsync:
# From your LOCAL machine, run:
rsync -avz --progress /path/to/oritool/ deploy@your_server_ip:/var/www/oritool/
```

**Option B: Using SCP from Local Machine**

```bash
# From your LOCAL machine:
cd /path/to/oritool
scp -r . deploy@your_server_ip:/var/www/oritool/
```

### 4.3 Setup Backend Environment

```bash
cd /var/www/oritool/backend

# Create .env file
nano .env
```

Add the following content to `.env`:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=oritool_user
DATABASE_PASSWORD=your_secure_password_here
DATABASE_NAME=oritool

# JWT
JWT_SECRET=your_very_secure_jwt_secret_key_here_min_32_chars

# App
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://oritool.com

# CORS
CORS_ORIGIN=https://oritool.com
```

### 4.4 Install Backend Dependencies & Build

```bash
cd /var/www/oritool/backend

# Install dependencies
npm install

# Build the application
npm run build

# Run database migrations (create tables)
npm run typeorm:run-migrations
# or
npm run build && node dist/main.js # This will auto-create tables with synchronize

# Seed the database with admin user
npm run seed
```

### 4.5 Test Backend Locally

```bash
# Test if backend starts
npm run start:prod

# Test in another terminal:
curl http://localhost:3000

# Stop the test (Ctrl+C)
```

---

## 5. Deploy Frontend (Vite/React)

### 5.1 Create Frontend Environment File

```bash
cd /var/www/oritool/frontend

# Create .env.production file
nano .env.production
```

Add:

```env
VITE_API_URL=https://oritool.com/api
```

### 5.2 Install Dependencies & Build

```bash
cd /var/www/oritool/frontend

# Install dependencies
npm install

# Build for production
npm run build
```

This creates a `dist` folder with optimized static files.

### 5.3 Create Upload Directories for Backend

```bash
# Create uploads directory with proper permissions
mkdir -p /var/www/oritool/backend/uploads/products
sudo chown -R $USER:$USER /var/www/oritool/backend/uploads
chmod -R 755 /var/www/oritool/backend/uploads
```

---

## 6. Configure Nginx

### 6.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/oritool.com
```

Add the following configuration:

```nginx
# Upstream for backend API
upstream backend_api {
    server 127.0.0.1:3000;
    keepalive 64;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name oritool.com www.oritool.com;
    
    # Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name oritool.com www.oritool.com;

    # SSL certificates (will be configured by certbot)
    ssl_certificate /etc/letsencrypt/live/oritool.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/oritool.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/json application/xml+rss application/x-font-ttf font/opentype image/svg+xml;

    # Frontend (React/Vite)
    location / {
        root /var/www/oritool/frontend/dist;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api {
        rewrite ^/api/(.*) /$1 break;
        
        proxy_pass http://backend_api;
        proxy_http_version 1.1;
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
        proxy_request_buffering off;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Serve uploaded files
    location /uploads {
        alias /var/www/oritool/backend/uploads;
        
        # Security: prevent execution of scripts
        location ~ \.(php|sh|exe)$ {
            deny all;
        }
        
        # Cache images
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Client max body size (for file uploads)
    client_max_body_size 10M;
}
```

### 6.2 Enable the Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/oritool.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# If test passes, reload Nginx
sudo systemctl reload nginx
```

---

## 7. Setup SSL with Let's Encrypt

### 7.1 Install Certbot

```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 7.2 Obtain SSL Certificate

**IMPORTANT:** Before running this, make sure:
- Your domain DNS A record points to your server IP
- Port 80 and 443 are open in your firewall

```bash
# Obtain certificate for your domain
sudo certbot --nginx -d oritool.com -d www.oritool.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (choose yes)
```

### 7.3 Setup Auto-Renewal

```bash
# Test renewal
sudo certbot renew --dry-run

# Certbot automatically sets up a cron job, but you can verify:
sudo systemctl status certbot.timer
```

### 7.4 If Certbot Fails (Manual Configuration)

If you get the certificate before Nginx config exists:

```bash
# Create directory for certbot
sudo mkdir -p /var/www/certbot

# Update the Nginx config to temporarily serve certbot without SSL
sudo nano /etc/nginx/sites-available/oritool.com

# Then run certbot standalone:
sudo certbot certonly --webroot -w /var/www/certbot -d oritool.com -d www.oritool.com
```

---

## 8. Setup PM2 Process Manager

### 8.1 Start Backend with PM2

```bash
cd /var/www/oritool/backend

# Start the backend
pm2 start dist/main.js --name oritool-backend

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup systemd
# Run the command that PM2 outputs (sudo env PATH=...)
```

### 8.2 PM2 Useful Commands

```bash
# View running processes
pm2 list

# View logs
pm2 logs oritool-backend

# Restart backend
pm2 restart oritool-backend

# Stop backend
pm2 stop oritool-backend

# Monitor processes
pm2 monit
```

### 8.3 Create PM2 Ecosystem File (Optional - Better Approach)

```bash
cd /var/www/oritool/backend
nano ecosystem.config.js
```

Add:

```javascript
module.exports = {
  apps: [{
    name: 'oritool-backend',
    script: 'dist/main.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/www/oritool/backend/logs/error.log',
    out_file: '/var/www/oritool/backend/logs/out.log',
    log_file: '/var/www/oritool/backend/logs/combined.log',
    time: true
  }]
}
```

Create logs directory:

```bash
mkdir -p /var/www/oritool/backend/logs
```

Start with ecosystem file:

```bash
pm2 start ecosystem.config.js
pm2 save
```

---

## 9. Final Steps & Testing

### 9.1 Setup Firewall (UFW)

```bash
# Enable firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

### 9.2 Test Your Deployment

1. **Test Frontend:**
   ```bash
   curl https://oritool.com
   ```

2. **Test Backend API:**
   ```bash
   curl https://oritool.com/api
   # or
   curl https://oritool.com/api/products
   ```

3. **Open in Browser:**
   - Visit: https://oritool.com
   - Try logging in with admin credentials
   - Upload a product image
   - Test all pages (Home, Services, Products, About, Contact)
   - Test language switching

### 9.3 Check Logs

```bash
# Backend logs
pm2 logs oritool-backend

# Nginx access logs
sudo tail -f /var/log/nginx/access.log

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

---

## 10. Maintenance & Updates

### 10.1 Update Application Code

```bash
# Pull latest changes
cd /var/www/oritool
git pull

# Update backend
cd backend
npm install
npm run build
pm2 restart oritool-backend

# Update frontend
cd ../frontend
npm install
npm run build
# No need to restart (static files are served by Nginx)
```

### 10.2 Backup Database

```bash
# Create backup
sudo -u postgres pg_dump oritool > /backup/oritool_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
sudo -u postgres psql oritool < /backup/oritool_20241014_120000.sql
```

### 10.3 Setup Automated Backups

```bash
# Create backup script
sudo nano /usr/local/bin/backup-oritool.sh
```

Add:

```bash
#!/bin/bash
BACKUP_DIR="/backup/oritool"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
sudo -u postgres pg_dump oritool > $BACKUP_DIR/db_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/oritool/backend/uploads

# Delete backups older than 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: $DATE"
```

Make executable:

```bash
sudo chmod +x /usr/local/bin/backup-oritool.sh
```

Add to crontab (daily at 2 AM):

```bash
sudo crontab -e
```

Add:

```
0 2 * * * /usr/local/bin/backup-oritool.sh >> /var/log/oritool-backup.log 2>&1
```

---

## Troubleshooting

### Issue: Can't connect to database

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
sudo -u postgres psql -d oritool -c "SELECT 1;"

# Check backend .env file
cat /var/www/oritool/backend/.env
```

### Issue: Nginx 502 Bad Gateway

```bash
# Check backend is running
pm2 status

# Check backend logs
pm2 logs oritool-backend

# Check Nginx error log
sudo tail -f /var/log/nginx/error.log
```

### Issue: SSL Certificate Problems

```bash
# Renew certificate manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

### Issue: Port 3000 Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or change backend port in .env and ecosystem.config.js
```

---

## Security Best Practices

1. **Keep System Updated:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Use Strong Passwords:**
   - Database password
   - JWT secret (minimum 32 characters)

3. **Regular Backups:**
   - Setup automated daily backups
   - Test restore process regularly

4. **Monitor Logs:**
   - Check logs regularly for suspicious activity
   - Setup log rotation

5. **Firewall:**
   - Only open necessary ports
   - Consider using fail2ban for SSH protection

6. **SSL/TLS:**
   - Always use HTTPS
   - Keep certificates up to date

---

## Quick Reference Commands

```bash
# Restart everything
pm2 restart oritool-backend
sudo systemctl reload nginx

# View logs
pm2 logs oritool-backend
sudo tail -f /var/log/nginx/error.log

# Check status
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql

# Rebuild frontend
cd /var/www/oritool/frontend
npm run build

# Rebuild backend
cd /var/www/oritool/backend
npm run build
pm2 restart oritool-backend
```

---

## Admin Credentials

After running `npm run seed`, you can login with:

- **Email:** `admin@oritool.com`
- **Password:** `admin123456`

**⚠️ IMPORTANT:** Change the admin password immediately after first login!

---

## Support

For issues or questions:
- Check logs: `pm2 logs oritool-backend`
- Check Nginx: `sudo nginx -t`
- Check database: `sudo -u postgres psql -d oritool`

---

**Deployment Complete!** 🎉

Your Oritool website should now be live at https://oritool.com

