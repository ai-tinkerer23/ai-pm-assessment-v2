# AI PM Assessment V2.0 - Deployment Checklist

## Pre-Deployment Checklist

### ✅ Code Review
- [x] All 46 questions properly formatted in index.html
- [x] Point values correct across all sections (Total: 100 points)
  - Section 1: 14 points (7 questions)
  - Section 2: 14 points (6 questions)
  - Section 3: 14 points (6 questions)
  - Section 4: 14 points (6 questions)
  - Section 5: 14 points (6 questions)
  - Section 6: 14 points (6 questions)
  - Section 7: 16 points (9 questions)
- [x] All tracking functions implemented (Google Analytics)
- [x] Email functionality working with generateEmailHTML()
- [x] Learning paths added for both weak AND strong performance
- [x] "What's New" section added to landing page
- [x] "Share Feedback" buttons added to final results and section overview

### ✅ Configuration Files
- [x] vercel.json created
- [x] .vercelignore created to exclude dev files

### ⚠️ Environment-Specific Updates Needed

Before deploying, you MUST update these values in index.html:

#### 1. Google Apps Script Webhook URL (Required for Email)
**Location:** Around line 3550
```javascript
// FIND THIS:
const response = await fetch('/api/submit', {

// REPLACE WITH YOUR ACTUAL WEBHOOK URL:
const response = await fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec', {
```

**How to get the webhook URL:**
1. Go to your Google Apps Script project
2. Deploy > Manage deployments
3. Copy the Web App URL (ends with /exec)

#### 2. 7-Day Signup URL (Optional, update when ready)
**Location:** Around line 3493
```javascript
// FIND THIS:
const signupURL = 'https://forms.gle/E7ekVCgFsvgHGHkY6';

// UPDATE TO YOUR ACTUAL SIGNUP FORM (if different)
```

#### 3. Assessment URL in Email (After first deployment)
**Location:** Around line 3492
```javascript
// FIND THIS:
const assessmentURL = 'https://ai-pm-assessment.vercel.app/';

// UPDATE TO YOUR ACTUAL VERCEL URL after deployment
```

### ✅ Testing Requirements

Before deploying to production, test these scenarios locally:

#### Basic Functionality
- [ ] Can start assessment and see landing page
- [ ] "Choose a Section" button works
- [ ] Can navigate to any section
- [ ] Questions display correctly with all options
- [ ] Can select answers and submit section
- [ ] Immediate feedback shows after submission
- [ ] Can navigate between sections
- [ ] Progress bar updates correctly

#### Scoring System
- [ ] Section scores calculate correctly
- [ ] Point values match difficulty (1pt beginner, 2pt intermediate, 3pt advanced)
- [ ] Total score shows correctly (out of 100)
- [ ] Percentage calculation is accurate
- [ ] Level assignment is correct:
  - 76-100%: Proficient AI PM
  - 51-75%: Developing AI PM
  - 0-50%: Early-Stage AI PM

#### Email Functionality
- [ ] "Email My Results" button appears on section overview
- [ ] Email modal opens with form
- [ ] Can submit email form (test with real email)
- [ ] Email received with correct scores
- [ ] Learning paths show for ALL sections (both strong and weak)
- [ ] Links in email work correctly

#### UI Elements
- [ ] "What's New" section displays on landing page
- [ ] "Share Feedback" button on final results page works
- [ ] "Share Feedback" button on section overview works
- [ ] All buttons have correct styling and gradients
- [ ] Responsive design works on mobile

## Vercel Deployment Steps

### 1. Initial Setup
```bash
# If you haven't installed Vercel CLI:
npm i -g vercel

# Login to Vercel (if not already logged in)
vercel login
```

### 2. Deploy to Preview
```bash
# Navigate to project directory
cd "/Users/lisamac/Documents/2025 Career/AI projects/AI Skills Assessment/AI Skills Assessment V2/ai-pm-assessment"

# Deploy to preview
vercel
```

This will:
- Create a preview deployment
- Give you a URL like: `https://ai-pm-assessment-xxxxx.vercel.app`
- Allow you to test before production

### 3. Test Preview Deployment
- [ ] Visit preview URL
- [ ] Test all functionality from Testing Requirements above
- [ ] Check console for errors (F12 > Console)
- [ ] Test email functionality with real email
- [ ] Verify Google Analytics tracking (if configured)

### 4. Deploy to Production
```bash
# If preview tests pass, deploy to production
vercel --prod
```

This will deploy to your production URL.

### 5. Update URLs After Deployment
After production deployment:
1. Copy your production URL (e.g., `https://ai-pm-assessment.vercel.app`)
2. Update `assessmentURL` in index.html (line ~3492)
3. Redeploy: `vercel --prod`

## Post-Deployment Verification

### Critical Tests
- [ ] Visit production URL
- [ ] Complete at least one full section
- [ ] Submit and verify immediate feedback
- [ ] Test email functionality
- [ ] Verify email received with correct content
- [ ] Check all links in email work
- [ ] Test "Share Feedback" buttons
- [ ] Verify Google Analytics events (if configured)

### Performance Checks
- [ ] Page loads quickly (< 3 seconds)
- [ ] No console errors
- [ ] Responsive on mobile devices
- [ ] All images/assets load correctly

## Google Apps Script Setup

If you haven't set up the email webhook yet:

1. Follow instructions in `WEBHOOK_SETUP.md`
2. Deploy Google Apps Script
3. Get webhook URL
4. Update index.html with webhook URL (see section above)
5. Redeploy to Vercel

## Troubleshooting

### Email Not Working
- Check webhook URL is correct in index.html
- Verify Google Apps Script is deployed
- Check Google Apps Script execution logs
- Test webhook with `test-helper.js` locally first

### Scoring Issues
- Verify point values in HTML match question bank
- Check sectionData max values:
  - Sections 1-6: max: 14
  - Section 7: max: 16
- Use browser console to debug: `console.log(sectionScores)`

### UI Issues
- Clear browser cache
- Check for CSS conflicts
- Verify all buttons have onclick handlers
- Check browser console for JavaScript errors

## Analytics Setup (Optional)

If you want to track user behavior:

1. Create Google Analytics 4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to index.html `<head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Rollback Plan

If issues occur after deployment:

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

## Success Criteria

Deployment is successful when:
- [x] Application loads without errors
- [x] All 7 sections accessible
- [x] Scoring works correctly (100-point scale)
- [x] Email functionality works end-to-end
- [x] Learning paths show for all performance levels
- [x] All buttons and links work
- [x] Responsive on mobile and desktop
- [x] No console errors
- [x] Google Apps Script logging data (if configured)

## Notes

- Vercel provides automatic HTTPS
- Deployments are instant (< 30 seconds)
- Preview URLs are permanent (good for testing)
- Production URL can be customized in Vercel dashboard
- Free tier includes unlimited deployments

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Google Apps Script: https://developers.google.com/apps-script
- Test Helper: Use `test-helper.js` for local testing

---

**Last Updated:** December 11, 2024
**Version:** 2.0
