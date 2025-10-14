# 🚀 Deployment Checklist for Oritool

Use this checklist to ensure a successful deployment to your Ubuntu VPS.

## Pre-Deployment Checklist

### Domain & DNS
- [ ] Domain purchased (oritool.com)
- [ ] DNS A record pointing to VPS IP address
- [ ] DNS propagation completed (check with `nslookup oritool.com`)
- [ ] Wait 30-60 minutes for DNS to fully propagate

### VPS Server
- [ ] Ubuntu VPS provisioned (20.04 or 22.04)
- [ ] SSH access configured
- [ ] Root or sudo access available
- [ ] At least 2GB RAM
- [ ] 20GB+ storage available
- [ ] Firewall ports planned (22, 80, 443)

### Code Preparation
- [ ] All environment variables documented
- [ ] Database credentials prepared
- [ ] JWT secret generated (32+ characters)
- [ ] Code tested locally
- [ ] All dependencies up to date

---

## Server Setup Checklist

### 1. Initial Server Setup
- [ ] SSH into server
- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Create deploy user (optional): `sudo adduser deploy`
- [ ] Configure UFW firewall

### 2. Install Software
- [ ] Install Node.js 20.x
- [ ] Verify Node.js: `node --version`
- [ ] Install PostgreSQL 14+
- [ ] Install Nginx
- [ ] Install PM2: `sudo npm install -g pm2`
- [ ] Install Git
- [ ] Install Certbot for SSL

### 3. Database Setup
- [ ] PostgreSQL service running
- [ ] Database created: `oritool`
- [ ] Database user created with password
- [ ] Permissions granted to user
- [ ] Connection tested

---

## Application Deployment Checklist

### 4. Upload Code
- [ ] Project directory created: `/var/www/oritool`
- [ ] Code uploaded via rsync, scp, or git
- [ ] Correct ownership set: `chown -R $USER:$USER /var/www/oritool`

### 5. Backend Configuration
- [ ] `.env` file created in `backend/`
- [ ] All environment variables set:
  - [ ] `DATABASE_HOST=localhost`
  - [ ] `DATABASE_PORT=5432`
  - [ ] `DATABASE_USERNAME=oritool_user`
  - [ ] `DATABASE_PASSWORD=***`
  - [ ] `DATABASE_NAME=oritool`
  - [ ] `JWT_SECRET=*** (32+ chars)`
  - [ ] `PORT=3000`
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL=https://oritool.com`
- [ ] Dependencies installed: `npm install`
- [ ] Backend built: `npm run build`
- [ ] Database seeded: `npm run seed`
- [ ] Admin credentials noted
- [ ] Uploads directory created: `mkdir -p uploads/products`
- [ ] Uploads permissions set: `chmod -R 755 uploads`

### 6. Frontend Configuration
- [ ] `.env.production` created in `frontend/`
- [ ] `VITE_API_URL=https://oritool.com/api` set
- [ ] Dependencies installed: `npm install`
- [ ] Frontend built: `npm run build`
- [ ] `dist/` folder generated successfully

---

## Web Server & SSL Checklist

### 7. Nginx Configuration
- [ ] Nginx config created: `/etc/nginx/sites-available/oritool.com`
- [ ] Frontend root path correct: `/var/www/oritool/frontend/dist`
- [ ] Backend proxy configured: `proxy_pass http://127.0.0.1:3000`
- [ ] Upload path configured: `alias /var/www/oritool/backend/uploads`
- [ ] Symlink created: `ln -s /etc/nginx/sites-available/oritool.com /etc/nginx/sites-enabled/`
- [ ] Default site disabled
- [ ] Nginx config tested: `sudo nginx -t`
- [ ] Nginx reloaded: `sudo systemctl reload nginx`

### 8. SSL Certificate
- [ ] Certbot installed
- [ ] Port 80 & 443 open in firewall
- [ ] Certificate obtained: `sudo certbot --nginx -d oritool.com -d www.oritool.com`
- [ ] Auto-renewal configured
- [ ] Auto-renewal tested: `sudo certbot renew --dry-run`

---

## Process Management Checklist

### 9. PM2 Setup
- [ ] Backend started with PM2: `pm2 start dist/main.js --name oritool-backend`
- [ ] PM2 process list saved: `pm2 save`
- [ ] PM2 startup script created: `pm2 startup systemd`
- [ ] Startup command executed
- [ ] PM2 status checked: `pm2 status`

### 10. Firewall Configuration
- [ ] UFW enabled
- [ ] SSH allowed: `sudo ufw allow OpenSSH`
- [ ] HTTP/HTTPS allowed: `sudo ufw allow 'Nginx Full'`
- [ ] Firewall status verified: `sudo ufw status`

---

## Testing Checklist

### 11. Functional Testing
- [ ] Frontend loads: `https://oritool.com`
- [ ] HTTPS working (green padlock)
- [ ] Backend API responds: `curl https://oritool.com/api/products`
- [ ] Products page loads
- [ ] Login page accessible
- [ ] Admin login successful
- [ ] Dashboard accessible after login
- [ ] Product creation works
- [ ] Image upload works
- [ ] Images display correctly
- [ ] All pages load (Home, Services, Products, About, Contact, Login)
- [ ] Language switcher works
- [ ] All 5 languages display correctly
- [ ] Contact form works
- [ ] Messages appear in inbox
- [ ] Mobile responsive design verified
- [ ] Dark mode works

### 12. Performance Testing
- [ ] Page load speed acceptable (<3s)
- [ ] Images optimized (WebP format)
- [ ] API response time acceptable (<500ms)
- [ ] Browser console clean (no errors)

### 13. Log Verification
- [ ] Backend logs clean: `pm2 logs oritool-backend`
- [ ] Nginx error log clean: `sudo tail -f /var/log/nginx/error.log`
- [ ] PostgreSQL log clean

---

## Post-Deployment Checklist

### 14. Security Hardening
- [ ] Admin password changed from default
- [ ] Strong database password used
- [ ] JWT secret is random and secure (32+ chars)
- [ ] SSH key authentication enabled
- [ ] Root login disabled (optional)
- [ ] Fail2ban installed (optional)
- [ ] Regular security updates scheduled

### 15. Backup Setup
- [ ] Backup directory created: `/backup/oritool`
- [ ] Backup script created: `/usr/local/bin/backup-oritool.sh`
- [ ] Backup script executable: `chmod +x`
- [ ] Cron job configured for daily backups
- [ ] Test backup: `./usr/local/bin/backup-oritool.sh`
- [ ] Test restore process

### 16. Monitoring Setup
- [ ] PM2 monitoring dashboard reviewed
- [ ] Log rotation configured
- [ ] Disk space monitoring planned
- [ ] Uptime monitoring considered (optional)
- [ ] Error alerting configured (optional)

### 17. Documentation
- [ ] Admin credentials saved securely
- [ ] Database credentials documented
- [ ] Server IP documented
- [ ] DNS settings documented
- [ ] Deployment process documented
- [ ] Team notified of deployment

---

## Automation & Maintenance Checklist

### 18. Deployment Automation
- [ ] `deploy.sh` script uploaded
- [ ] Script made executable: `chmod +x deploy.sh`
- [ ] Test deployment script: `./deploy.sh status`
- [ ] Document deployment workflow

### 19. Update Procedure
- [ ] Git repository configured (if using)
- [ ] Update process tested
- [ ] Rollback procedure documented

---

## Final Verification

### 20. Go-Live Checklist
- [ ] All features working
- [ ] No console errors
- [ ] All pages accessible
- [ ] SSL certificate valid
- [ ] Mobile site working
- [ ] Performance acceptable
- [ ] Backup system working
- [ ] Monitoring in place
- [ ] Documentation complete
- [ ] Team trained on admin panel

### 21. Post-Launch
- [ ] Monitor logs for first 24 hours
- [ ] Check error rates
- [ ] Monitor server resources (CPU, RAM, disk)
- [ ] Verify backup runs successfully
- [ ] Plan for first update/maintenance window
- [ ] Gather user feedback

---

## Quick Reference

### Important Commands

```bash
# Check status
./deploy.sh status
pm2 status
sudo systemctl status nginx
sudo systemctl status postgresql

# View logs
pm2 logs oritool-backend
sudo tail -f /var/log/nginx/error.log

# Restart services
pm2 restart oritool-backend
sudo systemctl reload nginx

# Deploy updates
./deploy.sh deploy

# Create backup
./deploy.sh backup
```

### Important Files

- **Backend Config:** `/var/www/oritool/backend/.env`
- **Frontend Config:** `/var/www/oritool/frontend/.env.production`
- **Nginx Config:** `/etc/nginx/sites-available/oritool.com`
- **PM2 Logs:** `~/.pm2/logs/`
- **Uploads:** `/var/www/oritool/backend/uploads/`

### Important URLs

- **Website:** https://oritool.com
- **Admin Login:** https://oritool.com/login
- **API Endpoint:** https://oritool.com/api
- **API Products:** https://oritool.com/api/products

---

## Troubleshooting Guide

### Issue: Site not loading
- [ ] Check Nginx: `sudo systemctl status nginx`
- [ ] Check Nginx config: `sudo nginx -t`
- [ ] Check DNS: `nslookup oritool.com`
- [ ] Check firewall: `sudo ufw status`

### Issue: API not responding
- [ ] Check PM2: `pm2 status`
- [ ] Check logs: `pm2 logs oritool-backend`
- [ ] Check port: `sudo lsof -i :3000`
- [ ] Restart backend: `pm2 restart oritool-backend`

### Issue: Database connection failed
- [ ] Check PostgreSQL: `sudo systemctl status postgresql`
- [ ] Check credentials in `.env`
- [ ] Test connection: `sudo -u postgres psql -d oritool`

### Issue: SSL certificate error
- [ ] Check certificate: `sudo certbot certificates`
- [ ] Renew certificate: `sudo certbot renew`
- [ ] Check Nginx SSL config

---

## Success Criteria

✅ **Deployment is successful when:**

1. ✅ Site loads at https://oritool.com with valid SSL
2. ✅ All pages work (Home, Services, Products, About, Contact, Login)
3. ✅ Admin can login and manage products
4. ✅ Images upload and display correctly
5. ✅ All 5 languages work properly
6. ✅ Contact form saves to database
7. ✅ No console errors
8. ✅ Mobile site is responsive
9. ✅ Backups are running
10. ✅ PM2 keeps backend running

---

**📋 Print this checklist and check off items as you complete them!**

For detailed instructions, refer to [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

