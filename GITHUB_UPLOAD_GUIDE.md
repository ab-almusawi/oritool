# 📤 GitHub Upload Guide for Oritool

Complete guide to upload your Oritool project to GitHub.

## Prerequisites

- [ ] Git installed on your computer
- [ ] GitHub account created
- [ ] Project ready to upload

## Step 1: Install Git (if not installed)

### Windows:
Download and install from: https://git-scm.com/download/win

### Verify Installation:
```powershell
git --version
```

## Step 2: Configure Git (First Time Only)

```powershell
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your-email@example.com"

# Verify configuration
git config --list
```

## Step 3: Create GitHub Repository

1. Go to GitHub: https://github.com
2. Click the **"+"** icon in the top right
3. Click **"New repository"**
4. Fill in:
   - **Repository name:** `oritool`
   - **Description:** "Modern technology solutions company website with admin dashboard"
   - **Visibility:** Choose **Public** or **Private**
   - **DO NOT** check "Initialize with README" (we already have one)
5. Click **"Create repository"**

## Step 4: Initialize Git Repository Locally

Open PowerShell in your project directory:

```powershell
# Navigate to your project
cd C:\Users\Hameed\Desktop\oritool

# Initialize git repository
git init

# Check status
git status
```

## Step 5: Add Files to Git

```powershell
# Add all files
git add .

# Check what will be committed
git status
```

**What gets committed:**
- ✅ All source code
- ✅ README.md, documentation files
- ✅ package.json files
- ✅ Configuration files
- ✅ .gitkeep files for empty directories

**What gets ignored (by .gitignore):**
- ❌ node_modules/
- ❌ .env files
- ❌ dist/ and build/ folders
- ❌ Uploaded files in uploads/
- ❌ Log files

## Step 6: Create First Commit

```powershell
# Commit with a message
git commit -m "Initial commit: Oritool website with multi-language support and admin dashboard"
```

## Step 7: Add Remote Repository

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```powershell
# Add remote repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/oritool.git

# Verify remote
git remote -v
```

## Step 8: Push to GitHub

```powershell
# Set the main branch name
git branch -M main

# Push to GitHub
git push -u origin main
```

### If it asks for authentication:

**Option A: Personal Access Token (Recommended)**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Oritool Project"
4. Select scopes: `repo` (all)
5. Generate and COPY the token
6. Use the token as your password when pushing

**Option B: GitHub Desktop (Easier)**
1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. Add your local repository
4. Publish to GitHub

## Step 9: Verify Upload

1. Go to your GitHub repository: `https://github.com/YOUR_GITHUB_USERNAME/oritool`
2. Check that all files are there
3. Check that .env files are NOT uploaded (security!)

---

## Complete PowerShell Script

Here's everything in one script you can copy-paste:

```powershell
# Navigate to project
cd C:\Users\Hameed\Desktop\oritool

# Configure git (first time only - replace with your info)
# git config --global user.name "Your Name"
# git config --global user.email "your-email@example.com"

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Oritool website with multi-language support and admin dashboard"

# Add remote (replace YOUR_GITHUB_USERNAME)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/oritool.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Future Updates

### To update your GitHub repository after making changes:

```powershell
# Navigate to project
cd C:\Users\Hameed\Desktop\oritool

# Check what changed
git status

# Add all changes
git add .

# Commit with descriptive message
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

---

## Common Issues & Solutions

### Issue: "fatal: not a git repository"
**Solution:** Run `git init` first

### Issue: "fatal: remote origin already exists"
**Solution:** 
```powershell
git remote remove origin
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/oritool.git
```

### Issue: "Authentication failed"
**Solution:** Use a Personal Access Token instead of password

### Issue: "Updates were rejected"
**Solution:** Pull first, then push:
```powershell
git pull origin main --allow-unrelated-histories
git push origin main
```

### Issue: ".env file is in GitHub!"
**Solution:** Remove it immediately:
```powershell
# Remove from git but keep locally
git rm --cached backend/.env
git rm --cached frontend/.env
git commit -m "Remove .env files"
git push

# Go to GitHub and check if they're gone
```

---

## Security Checklist

Before pushing to GitHub, verify:

- [ ] `.gitignore` files are in place
- [ ] No `.env` files will be uploaded
- [ ] No `node_modules/` folders will be uploaded
- [ ] No passwords or secrets in code
- [ ] No uploaded user files included
- [ ] Database credentials not in code

---

## What Your Repository Should Look Like

```
oritool/
├── .gitignore
├── README.md
├── DEPLOYMENT_GUIDE.md
├── DEPLOYMENT_CHECKLIST.md
├── deploy.sh
├── backend/
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   ├── uploads/
│   │   ├── .gitkeep
│   │   └── products/
│   │       └── .gitkeep
│   └── (no .env file!)
└── frontend/
    ├── .gitignore
    ├── package.json
    ├── index.html
    ├── src/
    └── (no .env file!)
```

---

## GitHub Repository Settings (After Upload)

### 1. Add Topics (for discoverability)
- Click "⚙️ Settings" → In "About" section
- Add topics: `nestjs`, `react`, `vite`, `typescript`, `postgresql`, `i18next`, `tailwindcss`, `nginx`, `pm2`

### 2. Add Description
"Modern multilingual company website with admin dashboard. Built with React, NestJS, PostgreSQL. Features: 5 languages, image optimization, contact management."

### 3. Set Website URL (after deployment)
`https://oritool.com`

### 4. Create .github/workflows (Optional - for CI/CD later)
Can set up GitHub Actions for automated testing/deployment

---

## Next Steps After Upload

1. ✅ Verify all files are on GitHub
2. ✅ Check that sensitive files are NOT uploaded
3. ✅ Add repository description and topics
4. ✅ Share repository link with team
5. ✅ Set up branch protection rules (optional)
6. ✅ Create development branch (optional)

---

## Quick Reference

```powershell
# Check status
git status

# Add changes
git add .

# Commit
git commit -m "Your message"

# Push
git push

# Pull latest
git pull

# View history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branch
git checkout main
```

---

**🎉 Your project is now on GitHub!**

Repository URL: `https://github.com/YOUR_GITHUB_USERNAME/oritool`

Clone URL: `git clone https://github.com/YOUR_GITHUB_USERNAME/oritool.git`
