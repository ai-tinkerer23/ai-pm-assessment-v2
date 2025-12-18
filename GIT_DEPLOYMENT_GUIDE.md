# Git Integration Deployment Guide - V2 as Separate Project

This guide shows you how to deploy V2.0 as a **separate Vercel project** using Git integration, test it, then switch your production domain.

---

## Strategy: Deploy V2 as New Project, Test, Then Switch

We'll create a new Vercel project for V2, keep V1 running, test V2 thoroughly, then move your production domain to V2.

---

## Step 1: Prepare Your Git Repository

### Option 1A: Create a New Branch for V2 (Recommended)

**If your V1 is on the `main` branch:**

```bash
cd "/Users/lisamac/Documents/2025 Career/AI projects/AI Skills Assessment/AI Skills Assessment V2/ai-pm-assessment"

# Check current status
git status

# Create a new branch for V2
git checkout -b v2-production

# Stage only the necessary files for deployment
git add index.html
git add vercel.json
git add .vercelignore

# Commit V2 changes
git commit -m "feat: AI PM Assessment V2.0 - Complete rebuild

- New 100-point scoring system with difficulty weighting
- 46 questions across 7 sections (added AI Use Cases section)
- Enhanced learning paths for all performance levels
- Email results functionality with personalized recommendations
- What's New section highlighting V2 improvements
- Share Feedback integration"

# Push to remote
git push -u origin v2-production
```

### Option 1B: Create a Separate Repository (Alternative)

**If you want completely separate repositories:**

```bash
cd "/Users/lisamac/Documents/2025 Career/AI projects/AI Skills Assessment/AI Skills Assessment V2"

# Create new repo for V2
mkdir ai-pm-assessment-v2
cd ai-pm-assessment-v2

# Initialize git
git init

# Copy only deployment files
cp ../ai-pm-assessment/index.html .
cp ../ai-pm-assessment/vercel.json .
cp ../ai-pm-assessment/.vercelignore .

# Create .gitignore
cat > .gitignore << 'EOF'
# Development files
test-helper.js
*.md
!README.md
!GIT_DEPLOYMENT_GUIDE.md
!DEPLOYMENT_CHECKLIST.md

# Question bank
v2 AI Assessment Question Bank.txt
*-replacement.txt
new-data-structures-*.js
new-question-data.js
parsed-question-bank.json

# Google Apps Script
google-apps-script-*.js

# System files
.DS_Store

# Deployment packages
*.zip
deployment-package-*/
EOF

# Add files
git add .
git commit -m "Initial commit: AI PM Assessment V2.0"

# Connect to GitHub (create repo on GitHub first)
# Follow GitHub's instructions to add remote and push
```

---

## Step 2: Deploy V2 as New Vercel Project via Git Integration

### 2A: Create New Vercel Project from Git

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard

2. **Click "Add New..." → "Project"**

3. **Import Git Repository:**
   - Click "Import Git Repository"
   - Select your GitHub/GitLab/Bitbucket account
   - Find the repository containing your V2 code
   - Click "Import"

4. **Configure Project:**
   - **Project Name**: `ai-pm-assessment-v2` (different from V1)
   - **Framework Preset**: Vercel should detect "Other" (static site)
   - **Root Directory**:
     - If using **Option 1A (branch)**: Leave as `.` (root)
     - If using **Option 1B (separate repo)**: Leave as `.` (root)
   - **Build Settings**:
     - Build Command: (leave empty for static site)
     - Output Directory: `.` (vercel.json handles this)
     - Install Command: (leave empty)

5. **Environment Variables:**
   - Skip for now (not needed for static site)

6. **Branch Selection:**
   - If using **Option 1A**: Select `v2-production` branch
   - If using **Option 1B**: Select `main` branch

7. **Click "Deploy"**

### 2B: Wait for Deployment

- Vercel will build and deploy (takes ~30 seconds)
- You'll get a preview URL like: `https://ai-pm-assessment-v2.vercel.app`
- This is your **V2 testing URL**

---

## Step 3: Test Your V2 Deployment

### 3A: Basic Functionality Test

1. **Visit your V2 URL**: `https://ai-pm-assessment-v2.vercel.app`

2. **Test checklist** (from [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)):
   - [ ] Landing page loads correctly
   - [ ] "What's New in V2.0" section appears
   - [ ] "Choose a Section" button works
   - [ ] Can navigate to each of the 7 sections
   - [ ] Questions display with all options
   - [ ] Can select answers and submit
   - [ ] Immediate feedback shows after submission
   - [ ] Progress bar updates correctly
   - [ ] Section overview shows scores correctly
   - [ ] Total score calculates to /100 points

### 3B: Email Functionality Test

1. **Complete at least one section**
2. **Go to Section Overview**
3. **Click "Email My Results"**
4. **Fill out the form with your real email**
5. **Submit**
6. **Check your email** for results with:
   - [ ] Correct scores
   - [ ] Section breakdown
   - [ ] Learning paths (both strong AND weak performance paths)
   - [ ] All links work

### 3C: UI Elements Test

- [ ] "Share Feedback" button appears on:
  - Final results page
  - Section overview page
- [ ] Feedback buttons link to: https://docs.google.com/forms/d/18IfMIaAu4zOfPYHa7IXyO68AZaSttwA0aAsHVnbBSWA/edit
- [ ] Responsive design works on mobile (test on phone)

### 3D: Browser Console Check

1. Press **F12** → **Console** tab
2. Look for any errors (should be none)
3. Test email functionality and verify no CORS errors

---

## Step 4: Update Assessment URL After Testing

Once you confirm V2 is working perfectly:

### 4A: Update the Assessment URL in Code

Find line ~3492 in index.html and update:

```javascript
// BEFORE:
const assessmentURL = 'https://ai-pm-assessment.vercel.app/';

// AFTER:
const assessmentURL = 'https://ai-pm-assessment-v2.vercel.app/';
```

### 4B: Commit and Push

```bash
# If using Option 1A (branch):
cd "/Users/lisamac/Documents/2025 Career/AI projects/AI Skills Assessment/AI Skills Assessment V2/ai-pm-assessment"
git add index.html
git commit -m "chore: update assessment URL to V2 deployment"
git push

# Vercel will auto-deploy the update
```

---

## Step 5: Switch Production Domain to V2

### Option A: Move Custom Domain (If You Have One)

If you have a custom domain pointing to V1:

1. **Go to V1 Project Settings**:
   - https://vercel.com/[your-username]/ai-pm-assessment (V1 project)
   - Click "Settings" → "Domains"
   - Click "..." next to your custom domain → "Remove"

2. **Go to V2 Project Settings**:
   - https://vercel.com/[your-username]/ai-pm-assessment-v2
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Vercel will automatically configure DNS

### Option B: Use V2's Vercel URL as Primary

If you're using Vercel's free URL (`ai-pm-assessment.vercel.app`):

1. **Share the new V2 URL**: `https://ai-pm-assessment-v2.vercel.app`
2. **Update all links** to the new URL in:
   - LinkedIn posts
   - Portfolio
   - Email signatures
   - Anywhere you've shared the assessment

### Option C: Request URL Transfer (Vercel Support)

You can contact Vercel support to transfer the URL `ai-pm-assessment.vercel.app` from V1 to V2:

1. **Delete V1 project** (after backing up)
2. **Rename V2 project** to `ai-pm-assessment` in Project Settings
3. The URL `ai-pm-assessment.vercel.app` should become available

---

## Step 6: Archive V1 (After Successful Migration)

Once V2 is live and working perfectly for a few days:

1. **Archive V1 project in Vercel**:
   - Go to V1 project → Settings → Advanced
   - Scroll to "Delete Project"
   - Or keep it paused for historical reference

2. **Update Git branches**:
```bash
# Mark V1 branch as archived
git checkout main  # or wherever V1 lives
git tag v1-archived
git push --tags

# Make v2-production your new main (optional)
git checkout v2-production
git branch -m main  # rename current branch to main
git push -u origin main
```

---

## Rollback Plan

If something goes wrong with V2:

### Quick Rollback:
1. V1 is still running at its original URL
2. Just switch your links back to V1's URL
3. Debug V2 without pressure

### Git Rollback:
```bash
# Revert to previous commit
git checkout v2-production
git log  # find the commit hash before the issue
git revert <commit-hash>
git push
```

---

## Automated Deployments (After Setup)

Once your V2 project is connected to Git:

**Every time you push to your V2 branch:**
- Vercel automatically deploys the changes
- You get a preview URL for each commit
- Deployments complete in ~30 seconds

**To deploy updates:**
```bash
cd "/Users/lisamac/Documents/2025 Career/AI projects/AI Skills Assessment/AI Skills Assessment V2/ai-pm-assessment"

# Make your changes to index.html or other files

git add .
git commit -m "fix: update learning paths for Section 3"
git push

# Vercel auto-deploys - check dashboard for status
```

---

## Summary: Your Deployment Path

1. ✅ **Option A Complete**: ZIP file created for manual upload testing
2. **Next**: Choose Git integration approach (1A or 1B)
3. **Then**: Deploy V2 as separate Vercel project
4. **Test**: Thoroughly test V2 using the checklist
5. **Switch**: Move domain/URLs to V2
6. **Archive**: Keep V1 as backup, then archive

---

## Questions?

- Check [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) for detailed testing requirements
- Vercel Docs: https://vercel.com/docs
- Git Integration: https://vercel.com/docs/deployments/git

---

**Last Updated:** December 11, 2024
**Version:** 2.0
