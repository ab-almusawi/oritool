# GitHub Setup & Server Update Guide

Your server is already live at **https://oritool.com**! This guide helps you:
1. Upload your code to GitHub
2. Update your live server with new changes

---

## Part 1: Upload to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `oritool`
3. **Make it Private** (recommended for production code)
4. **Do NOT** initialize with README, .gitignore, or license (we already have these)

### Step 2: Initialize Git and Push

```powershell
# Initialize git (if not already done)
cd C:\Users\Hameed\Desktop\oritool
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Oritool website with backend and frontend"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/oritool.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Verify Upload

Check your GitHub repository - you should see all files **except**:
- ✅ `docker-compose.yml` (ignored - contains password)
- ✅ `.env` files (ignored - contain secrets)
- ✅ `node_modules/` (ignored - too large)
- ✅ `uploads/` (ignored - user uploaded files)

### What IS Uploaded:

- ✅ `docker-compose.example.yml` (template without password)
- ✅ `backend/.env.example` (template without secrets)
- ✅ All source code (frontend & backend)
- ✅ Documentation files
- ✅ `.gitignore` files

---

## Part 2: Update Your Live Server

Your server is running at https://oritool.com. Here's how to update it:

### Method 1: Using Git (Recommended)

On your Ubuntu server:

```bash
# Navigate to project directory
cd /var/www/oritool  # or wherever your project is

# Pull latest changes from GitHub
git pull origin main

# Update backend
cd backend
npm install  # Install any new dependencies
npm run build  # Rebuild
pm2 restart oritool-backend  # Restart backend

# Update frontend
cd ../frontend
npm install  # Install any new dependencies
npm run build  # Rebuild
# Frontend files are automatically served by Nginx

# Verify everything is running
pm2 status
pm2 logs oritool-backend
```

### Method 2: Manual Upload (Alternative)

If you prefer to upload files manually:

1. **Build locally first:**
   ```powershell
   # Build backend
   cd backend
   npm run build
   
   # Build frontend
   cd ../frontend
   npm run build
   ```

2. **Upload to server** using SFTP/SCP:
   ```powershell
   # Upload backend dist folder
   scp -r backend/dist/ user@oritool.com:/var/www/oritool/backend/
   
   # Upload frontend dist folder
   scp -r frontend/dist/ user@oritool.com:/var/www/oritool/frontend/
   ```

3. **Restart on server:**
   ```bash
   pm2 restart oritool-backend
   ```

---

## Part 3: Quick Reference - Common Commands

### On Your Local Machine (Windows)

```powershell
# Check git status
git status

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Check what's ignored
git status --ignored
```

### On Your Server (Ubuntu)

```bash
# Check PM2 status
pm2 status

# View backend logs
pm2 logs oritool-backend

# Restart backend
pm2 restart oritool-backend

# Check Nginx status
sudo systemctl status nginx

# Test Nginx configuration
sudo nginx -t

# Reload Nginx (if you changed config)
sudo systemctl reload nginx

# Check if PostgreSQL is running
sudo systemctl status postgresql
```

---

## Part 4: Making Changes Workflow

### Typical workflow when you make changes:

1. **Make changes locally** (on your Windows machine)
2. **Test locally:**
   ```powershell
   # Terminal 1: Start backend
   cd backend
   npm run start:dev
   
   # Terminal 2: Start frontend
   cd frontend
   npm run dev
   
   # Test at http://localhost:5173
   ```

3. **Commit to Git:**
   ```powershell
   git add .
   git commit -m "Fixed product upload feature"
   git push origin main
   ```

4. **Update server:**
   ```bash
   # SSH to server
   ssh user@oritool.com
   
   # Pull and rebuild
   cd /var/www/oritool
   git pull origin main
   cd backend && npm run build && cd ..
   cd frontend && npm run build && cd ..
   pm2 restart oritool-backend
   ```

5. **Verify:** Visit https://oritool.com

---

## Part 5: Current Server Status

Based on https://oritool.com/api responding with "Hello World!", your server has:

- ✅ Domain configured (oritool.com)
- ✅ SSL certificate active (https working)
- ✅ Backend deployed and running
- ⚠️ Backend needs full code deployment (currently showing default page)
- ❓ Frontend status unknown

### Next Steps:

1. **Upload code to GitHub** (see Part 1)
2. **Deploy full application to server:**
   ```bash
   # On server
   cd /var/www/oritool
   
   # If you haven't cloned yet:
   git clone https://github.com/YOUR_USERNAME/oritool.git .
   
   # Setup backend
   cd backend
   cp .env.example .env
   # Edit .env with your actual values: nano .env
   npm install
   npm run build
   
   # Setup frontend
   cd ../frontend
   cp .env.example .env.production
   # Edit .env.production with: VITE_API_URL=https://oritool.com/api
   npm install
   npm run build
   
   # Start with PM2
   cd ../backend
   pm2 start dist/main.js --name oritool-backend
   pm2 save
   pm2 startup
   ```

---

## Troubleshooting

### "git push" asks for username/password every time

Use SSH keys or Personal Access Token:
```powershell
# Option 1: Use SSH URL instead
git remote set-url origin git@github.com:YOUR_USERNAME/oritool.git

# Option 2: Use GitHub CLI
# Download from: https://cli.github.com/
gh auth login
```

### Cannot connect to server

```powershell
# Test connection
ping oritool.com
ssh -v user@oritool.com
```

### Changes not showing on website

```bash
# Clear browser cache
# Or test in incognito mode

# On server, check Nginx is serving latest files:
ls -la /var/www/oritool/frontend/dist
sudo systemctl reload nginx
```

### Backend errors

```bash
# Check logs
pm2 logs oritool-backend --lines 100

# Check environment variables
pm2 env 0  # where 0 is the app ID from pm2 status

# Restart backend
pm2 restart oritool-backend
```

---

## Security Notes

### Files with Secrets (NEVER commit these):

- ❌ `docker-compose.yml` - Contains database password
- ❌ `backend/.env` - Contains JWT secret, database credentials
- ❌ `frontend/.env.production` - May contain API keys

### Safe to Commit:

- ✅ `docker-compose.example.yml`
- ✅ `backend/.env.example`
- ✅ All `.gitignore` files
- ✅ Documentation
- ✅ Source code

---

## Need Help?

- **Check deployment guide:** `DEPLOYMENT_GUIDE.md`
- **Check deployment checklist:** `DEPLOYMENT_CHECKLIST.md`
- **PM2 documentation:** https://pm2.keymetrics.io/docs/usage/quick-start/
- **Nginx documentation:** https://nginx.org/en/docs/
