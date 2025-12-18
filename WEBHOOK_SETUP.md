# Google Apps Script Email Webhook Setup Guide

This guide will help you set up a Google Apps Script webhook to send HTML email results to users who complete the assessment.

## 📋 What This Does

When a user completes the assessment and enters their email:
1. Their results are sent to your webhook
2. An HTML email is automatically sent to them with:
   - Total score and competency level
   - Section-by-section breakdown
   - Personalized learning paths (for sections < 70%)
   - Links to feedback form, signup, and retake
3. Results are logged to a Google Sheet for your records (optional)

## 🚀 Setup Instructions

### Step 1: Go to Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click **New Project**
3. Name your project **"AI Assessment Email Webhook"**

### Step 2: Add the Webhook Code

Copy the code from the `google-apps-script-email.js` file in this repository and paste it into the Apps Script editor.

Alternatively, copy and paste this entire code into the Apps Script editor:

See the `google-apps-script-email.js` file for the complete code.

### Step 3: (Optional) Create Google Sheet for Logging

If you want to track all assessment submissions in a Google Sheet:

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it **"AI Assessment Email Log"**
4. Go back to your Apps Script project
5. In the Apps Script editor, click **Project Settings** (gear icon)
6. Note your Script ID
7. Open your Google Sheet, click **Extensions > Apps Script**
8. In the Apps Script editor that opens, click **Project Settings**
9. Under "Google Cloud Platform (GCP) Project," click "Change project"
10. Enter the Script ID from your webhook project

Alternatively, you can skip the sheet logging by commenting out line 27 in the script: `// logToSheet(data);`

### Step 4: Save the Script

1. Click the **Save** icon (💾) or press `Ctrl+S` / `Cmd+S`
2. The project should already be named from Step 1

### Step 5: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the settings:
   - **Description**: "AI Assessment Email Webhook"
   - **Execute as**: **Me** (your@email.com)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. **Authorization Required**: Click "Authorize access"
7. Choose your Google account
8. Click "Advanced" > "Go to AI Assessment Email Webhook (unsafe)"
9. Click "Allow"
10. **IMPORTANT**: Copy the **Web App URL** - it looks like:
    ```
    https://script.google.com/macros/s/AKfycbxxxxx.../exec
    ```
11. Click **Done**

### Step 6: Test the Webhook (Highly Recommended)

1. In the Apps Script editor, select **testWebhook** from the function dropdown at the top
2. Click the **Run** button (▶️)
3. Check your email (test@example.com from the test function) - you should receive a test email with sample results
4. If you set up Google Sheets logging, check the sheet - you should see a new "Email Log" tab with test data

### Step 7: Update Your Index.html File

1. Open `index.html` in your code editor
2. Find this line (around line 3287):
   ```javascript
   const response = await fetch('/api/submit', {
   ```
3. Replace `/api/submit` with your actual Web App URL from Step 5:
   ```javascript
   const response = await fetch('https://script.google.com/macros/s/AKfycbxxxxx.../exec', {
   ```
4. Save the file

### Step 8: Update the 7-Day Signup URL (When Ready)

In `index.html` around line 3234, find:
```javascript
const signupURL = 'PLACEHOLDER_SIGNUP_URL';
```

Replace with your actual signup link when you create it.

### Step 9: Test the Complete Flow

1. Open your `index.html` in a browser (or deploy to your web host)
2. Complete at least one section of the assessment
3. Click "📧 Email My Results"
4. Enter your email address and submit
5. Check your email - you should receive your personalized results!
6. If logging is enabled, check your Google Sheet - new data should appear

## 📊 Understanding Your Data (If Using Google Sheets Logging)

### Email Log Sheet Columns:
- **Timestamp**: When the email was sent
- **Email**: User's email address
- **Total Score**: Points earned out of 100
- **Max Score**: Always 100
- **Percentage**: Overall performance percentage
- **Level**: Competency level (Proficient/Developing/Early-Stage AI PM)
- **Completed Sections**: Number of sections they completed
- **Section Scores**: JSON object with all section scores

### Email Content Sent to Users:
Each user receives an HTML email with:
1. **Total score and percentage**
2. **Competency level**
3. **Section breakdown** showing score for each section
4. **Personalized learning paths** - ONLY for sections where they scored < 70%
   - Each weak section includes 4 specific resources with working hyperlinks
   - Strong sections (≥70%) show score only, no learning path
5. **Next steps** with links to:
   - Feedback form
   - 7-day upskilling signup
   - Retake assessment

## 🔧 Troubleshooting

### "Script function not found: doPost"
- Make sure you saved the script after pasting the code
- Redeploy: Deploy > Manage deployments > Edit > Version: New version > Deploy

### No email received
- Check spam folder
- Verify the email address you entered is correct
- Check Apps Script logs: In Apps Script editor, click "Executions" (clock icon on left)
- Look for error messages in the execution log
- Make sure you authorized the script properly in Step 5

### "Failed to send" error in browser
- Check browser console for errors (F12 > Console tab)
- Make sure you replaced `/api/submit` with your actual Google Apps Script URL
- Verify the URL ends with `/exec` not `/dev`
- Try the test function in Apps Script to verify the script works

### Permission denied errors
- Go to Apps Script > Deploy > Manage deployments
- Click Edit (pencil icon)
- Change "Execute as" to "Me"
- Change "Who has access" to "Anyone"
- Click "Deploy"
- You may need to re-authorize

### Emails sending but no data in Google Sheet
- Make sure you created a Google Sheet and connected it properly (Step 3)
- OR comment out line 27 in the script if you don't want sheet logging: `// logToSheet(data);`
- Check Apps Script execution logs for errors

## 🎨 Optional Enhancements

### Get Notified When Someone Takes the Assessment
Add this to the `doPost` function after line 24:

```javascript
// Send yourself a notification
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: 'New AI Assessment Submission',
  body: `New assessment from ${data.email}\n\nScore: ${data.totalScore}/${data.maxScore} (${data.percentage}%)\nLevel: ${data.level}`
});
```

### Customize the Email Design
Edit the `emailHTML` structure in [index.html](index.html) (lines 3236-3270) to match your branding:
- Change colors (currently #FF6B9D)
- Add your logo
- Modify text and messaging
- Adjust spacing and layout

### Format the Google Sheet
After first submission:
- Freeze the header row: View > Freeze > 1 row
- Add filters: Data > Create a filter
- Format dates: Select column A > Format > Number > Date time
- Add conditional formatting for scores (e.g., green for ≥70%, yellow for 50-69%, red for <50%)

## 📝 Notes

- The webhook sends emails in real-time as users submit
- Email sending quota: Gmail allows ~100 emails/day with free Google accounts, 1500/day with Google Workspace
- Check Apps Script logs for debugging: Click "Executions" (clock icon) in Apps Script editor
- The Web App URL is public but only accepts POST requests with the correct data format
- All personalization (learning paths, scoring) happens client-side before sending to webhook

## 🔐 Security & Privacy

- Only you can access the Google Sheet data (if logging is enabled)
- Emails are sent from your Gmail account
- The Web App URL is public but doesn't expose any data
- User emails are only used to send results (not stored unless you enable sheet logging)
- Consider privacy policy/terms if collecting data at scale

## 📊 For the 7-Day Signup Feature

You mentioned wanting a simple signup for the 7-day course. Here's the recommended approach:

**Option 1: Google Form (Easiest)**
1. Create a Google Form with email field
2. Use pre-filled URL: `https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.FIELD_ID={{email}}`
3. Replace `PLACEHOLDER_SIGNUP_URL` in [index.html:3234](index.html#L3234) with this URL
4. Export responses to Google Sheets
5. Import to Kit/Mailchimp when ready

**Option 2: Add to Current Webhook**
Add this to the `doPost` function to automatically enroll users who get results:
```javascript
// Add to a "Course Signups" sheet
let signupSheet = ss.getSheetByName('Course Signups');
if (!signupSheet) {
  signupSheet = ss.insertSheet('Course Signups');
  signupSheet.appendRow(['Timestamp', 'Email', 'Score', 'Level']);
}
signupSheet.appendRow([new Date(), data.email, data.totalScore, data.level]);
```

Then just include that sheet when setting up your email campaign.

---

**Need help?** Check the [Apps Script documentation](https://developers.google.com/apps-script) or open an issue in this repository.
