# Production Deployment Guide

## Architecture Overview

```
User Browser
     ↓
https://www.oritool.com  (Nginx)
     ↓
     ├─→ /          → Frontend (React SPA from /dist)
     └─→ /api/*     → Backend (Proxied to localhost:3000)
```

**Benefits:**
- ✅ No CORS issues (same origin)
- ✅ Single domain for everything
- ✅ SSL for both frontend and backend
- ✅ Better security and performance

---

## Prerequisites on Server

1. **Node.js** installed
2. **Nginx** installed
3. **PM2** (for running backend) - `npm install -g pm2`
4. **SSL Certificate** (Let's Encrypt recommended)

---

## Step 1: Build Frontend

On your local machine or server:

```bash
cd /root/snap/frontend

# Install dependencies
npm install

# Build for production
npm run build
```

This creates the `dist` folder with optimized files.

---

## Step 2: Deploy Backend

Make sure your backend is running on `localhost:3000`:

```bash
cd /root/snap/backend

# Install dependencies
npm install

# Start with PM2
pm2 start dist/main.js --name oritool-api

# OR if using npm script
pm2 start "npm run start:prod" --name oritool-api

# Save PM2 configuration
pm2 save
pm2 startup
```

Verify backend is running:
```bash
curl http://localhost:3000/products
```

---

## Step 3: Configure Nginx

### 3.1: Copy Nginx Configuration

```bash
# Copy the nginx.conf to sites-available
sudo cp /root/snap/frontend/nginx.conf /etc/nginx/sites-available/oritool.com

# Update SSL certificate paths in the file
sudo nano /etc/nginx/sites-available/oritool.com
```

Update these lines with your SSL certificate paths:
```nginx
ssl_certificate /etc/letsencrypt/live/oritool.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/oritool.com/privkey.pem;
```

### 3.2: Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/oritool.com /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

---

## Step 4: Setup SSL (if not already done)

If you don't have SSL certificates yet:

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d oritool.com -d www.oritool.com

# Auto-renewal is configured automatically
```

---

## Step 5: Verify Deployment

### Check Backend:
```bash
curl http://localhost:3000/products
```

### Check Frontend:
```bash
curl https://www.oritool.com
```

### Check API through Nginx:
```bash
curl https://www.oritool.com/api/products
```

All should work without CORS errors!

---

## File Structure on Server

```
/root/snap/
├── frontend/
│   ├── dist/              ← Built frontend files (served by nginx)
│   ├── node_modules/
│   ├── src/
│   ├── package.json
│   └── nginx.conf         ← Nginx configuration
└── backend/
    ├── dist/              ← Built backend files
    ├── node_modules/
    ├── src/
    └── package.json
```

---

## Updating the Application

### Update Frontend:
```bash
cd /root/snap/frontend
git pull origin main  # or copy new files
npm install
npm run build
# Nginx automatically serves new dist files
```

### Update Backend:
```bash
cd /root/snap/backend
git pull origin main  # or copy new files
npm install
npm run build
pm2 restart oritool-api
```

---

## Troubleshooting

### Check Nginx Logs:
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Check Backend Logs:
```bash
pm2 logs oritool-api
```

### Test Backend Direct:
```bash
curl http://localhost:3000/products
```

### Test API Through Nginx:
```bash
curl https://www.oritool.com/api/products
```

### Restart Services:
```bash
# Restart backend
pm2 restart oritool-api

# Restart nginx
sudo systemctl restart nginx
```

---

## Environment Variables

The frontend is built with:
- **Development**: `VITE_API_URL=http://localhost:3000`
- **Production**: `VITE_API_URL=/api`

The production build automatically uses `/api` which nginx proxies to `localhost:3000`.

---

## Security Notes

1. Backend only listens on `localhost:3000` (not exposed to internet)
2. All traffic goes through Nginx with SSL
3. Nginx handles rate limiting and security headers
4. File upload size limited to 10MB (configurable in nginx.conf)

---

## Quick Commands Reference

```bash
# View running processes
pm2 list

# View logs
pm2 logs oritool-api

# Restart backend
pm2 restart oritool-api

# Test nginx config
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Check nginx status
sudo systemctl status nginx
```
