/**
 * AI Skills Assessment - COMBINED Webhook Handler
 * 1. Sends HTML email to user with personalized results
 * 2. Logs data to your existing Google Sheet with email status
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your EXISTING Google Apps Script project (the one that writes to your sheet)
 * 2. Replace ALL code with this combined version
 * 3. Save (Ctrl+S / Cmd+S)
 * 4. Redeploy: Deploy > Manage deployments > Edit > New version > Deploy
 * 5. Your existing webhook URL stays the same - no need to update index.html
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    Logger.log('Processing submission for: ' + data.email);

    // Get the active spreadsheet (your existing sheet)
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // STEP 1: Try to send email first
    let emailStatus = 'Failed';
    let emailError = '';

    try {
      if (data.emailHTML) {
        MailApp.sendEmail({
          to: data.email,
          subject: 'Your AI PM Assessment Results',
          htmlBody: data.emailHTML
        });
        emailStatus = 'Sent';
        Logger.log('✅ Email sent successfully to: ' + data.email);
      } else {
        emailStatus = 'No HTML provided';
        Logger.log('⚠️ No emailHTML in data - skipping email');
      }
    } catch (emailErr) {
      emailStatus = 'Failed';
      emailError = emailErr.toString();
      Logger.log('❌ Email error: ' + emailError);
      // Don't fail the whole request if email fails - still log to sheet
    }

    // STEP 2: Log to your existing "Responses" sheet
    let responsesSheet = ss.getSheetByName('Responses');
    if (!responsesSheet) {
      responsesSheet = ss.insertSheet('Responses');
      // Add headers (matching your existing structure + email status)
      responsesSheet.appendRow([
        'Timestamp',
        'Email',
        'Job Title',
        'Company',
        'Interest',
        'Preference',
        'Preference Other',
        'Total Score',
        'Max Score',
        'Percentage',
        'Completed Sections',
        'Section Details',
        'Email Status'  // NEW COLUMN
      ]);
    }

    // Calculate percentage
    const percentage = data.maxScore > 0
      ? Math.round((data.totalScore / data.maxScore) * 100)
      : 0;

    // Prepare response data (matching your existing structure)
    const timestamp = new Date(data.timestamp || new Date().toISOString());
    const rowData = [
      timestamp,
      data.email,
      data.jobTitle || '',
      data.company || '',
      data.interest || '',
      data.preference || '',
      data.preferenceOther || '',
      data.totalScore,
      data.maxScore,
      percentage + '%',
      data.completedSections,
      JSON.stringify(data.sectionScores),
      emailStatus + (emailError ? ': ' + emailError : '')  // NEW: Email status
    ];

    // Append to Responses sheet
    responsesSheet.appendRow(rowData);
    Logger.log('✅ Data logged to Responses sheet');

    // STEP 3: Log to "Section Details" sheet (if you want to keep this)
    let detailsSheet = ss.getSheetByName('Section Details');
    if (!detailsSheet) {
      detailsSheet = ss.insertSheet('Section Details');
      // Add headers
      detailsSheet.appendRow([
        'Timestamp',
        'Email',
        'Section Number',
        'Section Name',
        'Score',
        'Max Score',
        'Percentage'
      ]);
    }

    // Add section details if provided
    if (data.sectionScores) {
      // Map section numbers to names
      const sectionNames = {
        '1': 'AI FUNDAMENTALS',
        '2': 'AI STRATEGY',
        '3': 'Hands-On Building',
        '4': 'Data & Privacy',
        '5': 'Product Development',
        '6': 'Economics',
        '7': 'AI Use Cases'
      };

      const sectionMaxScores = {
        '1': 14, '2': 14, '3': 14, '4': 14, '5': 14, '6': 14, '7': 16
      };

      for (const [sectionNum, score] of Object.entries(data.sectionScores)) {
        const maxScore = sectionMaxScores[sectionNum] || 14;
        const sectionPercentage = Math.round((score / maxScore) * 100);

        detailsSheet.appendRow([
          timestamp,
          data.email,
          'Section ' + sectionNum,
          sectionNames[sectionNum] || 'Unknown Section',
          score,
          maxScore,
          sectionPercentage + '%'
        ]);
      }
      Logger.log('✅ Section details logged');
    }

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data logged and email ' + (emailStatus === 'Sent' ? 'sent successfully' : 'status: ' + emailStatus)
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log critical error
    Logger.log('❌ Critical error: ' + error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Test function - run this to test both email sending AND sheet logging
 */
function testWebhook() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: "YOUR_EMAIL@gmail.com", // ⚠️ CHANGE THIS TO YOUR ACTUAL EMAIL
        jobTitle: "Product Manager",
        company: "Test Company",
        interest: "Learning AI",
        preference: "Email results",
        preferenceOther: "",
        timestamp: new Date().toISOString(),
        totalScore: 75,
        maxScore: 100,
        percentage: 75,
        level: "Developing AI PM",
        completedSections: 7,
        totalSections: 7,
        sectionScores: {
          "1": 12, "2": 10, "3": 11,
          "4": 10, "5": 12, "6": 10, "7": 10
        },
        emailHTML: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
        <p>Hi there,</p>
        <p>Thanks for completing the AI Product Manager Skills Assessment!</p>
        <h2 style="color: #FF6B9D; border-bottom: 2px solid #FF6B9D; padding-bottom: 10px;">YOUR RESULTS</h2>
        <p style="font-size: 18px;"><strong>Total Score: 75/100 (75%)</strong></p>
        <p style="font-size: 16px; color: #666;">Level: Developing AI PM</p>
        <h2 style="color: #FF6B9D; border-bottom: 2px solid #FF6B9D; padding-bottom: 10px; margin-top: 30px;">SECTION BREAKDOWN</h2>
        <div style="margin-bottom: 20px;">
            <strong>Section 1: AI Fundamentals</strong> - 12/14 points (86%)<br>
            <strong>Section 2: AI Strategy</strong> - 10/14 points (71%)<br>
        </div>
        <h2 style="color: #FF6B9D; border-bottom: 2px solid #FF6B9D; padding-bottom: 10px; margin-top: 30px;">NEXT STEPS</h2>
        <p>💬 <a href="https://docs.google.com/forms/d/18IfMIaAu4zOfPYHa7IXyO68AZaSttwA0aAsHVnbBSWA/edit" target="_blank">Share feedback</a></p>
        <p>🚀 Get 7 days of free AI upskilling exercises</p>
        <p>🎯 Retake the assessment</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Best,<br>
            <strong>Lisa Lee-Prioly</strong><br>
            Building AI learning tools for the tech workforce<br>
            Connect with me on <a href="https://www.linkedin.com/in/lisa-lee-prioly/" target="_blank">LinkedIn</a></p>
        </div>
    </div>
</body>
</html>`
      })
    }
  };

  const result = doPost(testData);
  Logger.log('Test result: ' + result.getContent());

  // Check results
  Logger.log('');
  Logger.log('🔍 CHECK THESE:');
  Logger.log('1. Did you receive a test email at: YOUR_EMAIL@gmail.com?');
  Logger.log('2. Check your Responses sheet - is there a new row?');
  Logger.log('3. Check the "Email Status" column - does it say "Sent"?');
  Logger.log('4. Check Executions log for any errors');
}

/**
 * Simple email-only test to verify MailApp works
 */
function testEmailOnly() {
  try {
    MailApp.sendEmail({
      to: 'YOUR_EMAIL@gmail.com', // ⚠️ CHANGE THIS
      subject: 'Simple Test from Apps Script',
      body: 'If you receive this, MailApp is working correctly.'
    });
    Logger.log('✅ Simple test email sent');
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
  }
}
