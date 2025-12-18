/**
 * AI Skills Assessment - Email Webhook Handler (FIXED VERSION)
 * Receives assessment results and sends formatted HTML email to user
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Apps Script: https://script.google.com
 * 2. Open your existing project
 * 3. Replace the code with this version
 * 4. Save and redeploy (Deploy > Manage deployments > Edit > Version: New version > Deploy)
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Log incoming data for debugging
    Logger.log('Received data for email: ' + data.email);
    Logger.log('Email HTML length: ' + (data.emailHTML ? data.emailHTML.length : 'undefined'));

    // PRIORITY: Send email first (don't let sheet logging errors prevent email)
    try {
      MailApp.sendEmail({
        to: data.email,
        subject: 'Your AI PM Assessment Results',
        htmlBody: data.emailHTML
      });
      Logger.log('Email sent successfully to: ' + data.email);
    } catch (emailError) {
      Logger.log('Email sending error: ' + emailError.toString());
      // Return error if email fails
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Failed to send email: ' + emailError.toString()
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // SECONDARY: Try to log to sheet (but don't fail if this errors)
    try {
      logToSheet(data);
    } catch (sheetError) {
      Logger.log('Sheet logging error (non-critical): ' + sheetError.toString());
      // Don't fail the request if sheet logging fails
    }

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error
    Logger.log('Critical error: ' + error.toString());

    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional function to log results to Google Sheet
 * This keeps a record of all assessments for your analytics
 *
 * NOTE: This requires a Google Sheet to be bound to this script.
 * If you don't have a sheet, this will error but won't prevent emails from sending.
 */
function logToSheet(data) {
  // Get the active spreadsheet (must be bound to this project)
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (!ss) {
    Logger.log('No spreadsheet bound to this project - skipping sheet logging');
    return;
  }

  // Get or create the "Email Log" sheet
  let logSheet = ss.getSheetByName('Email Log');
  if (!logSheet) {
    logSheet = ss.insertSheet('Email Log');
    // Add headers
    logSheet.appendRow([
      'Timestamp',
      'Email',
      'Total Score',
      'Max Score',
      'Percentage',
      'Level',
      'Completed Sections',
      'Section Scores'
    ]);
  }

  // Append the data
  logSheet.appendRow([
    new Date(data.timestamp),
    data.email,
    data.totalScore,
    data.maxScore,
    data.percentage + '%',
    data.level,
    data.completedSections,
    JSON.stringify(data.sectionScores)
  ]);

  Logger.log('Data logged to sheet successfully');
}

/**
 * Test function - run this to test the webhook
 * This sends a test email to test@example.com
 */
function testWebhook() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: "test@example.com", // CHANGE THIS TO YOUR EMAIL FOR TESTING
        timestamp: new Date().toISOString(),
        totalScore: 75,
        maxScore: 100,
        percentage: 75,
        level: "Developing AI PM",
        sectionScores: { "1": 12, "2": 10, "3": 11, "4": 10, "5": 12, "6": 10, "7": 10 },
        completedSections: 7,
        totalSections: 7,
        emailHTML: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
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
        </div>
        <h2 style="color: #FF6B9D; border-bottom: 2px solid #FF6B9D; padding-bottom: 10px; margin-top: 30px;">NEXT STEPS</h2>
        <p>💬 <a href="https://docs.google.com/forms/d/18IfMIaAu4zOfPYHa7IXyO68AZaSttwA0aAsHVnbBSWA/edit" target="_blank">Share feedback</a></p>
        <p>🚀 Get 7 days of free AI upskilling exercises launching next week</p>
        <p>🎯 Retake the assessment</p>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Best,<br>
            <strong>Lisa Lee-Prioly</strong><br>
            Building AI learning tools for the tech workforce<br>
            Connect with me on <a href="https://www.linkedin.com/in/lisa-lee-prioly/" target="_blank">LinkedIn</a></p>
        </div>
    </div>
</body>
</html>
        `
      })
    }
  };

  const result = doPost(testData);
  Logger.log('Test result: ' + result.getContent());

  // Also check the logs
  Logger.log('Check the Executions log to see if the email was sent');
}

/**
 * Simple test to verify MailApp works
 */
function testEmailOnly() {
  try {
    MailApp.sendEmail({
      to: 'test@example.com', // CHANGE THIS TO YOUR EMAIL
      subject: 'Test Email from Apps Script',
      body: 'If you receive this, MailApp is working correctly.'
    });
    Logger.log('Test email sent successfully');
  } catch (error) {
    Logger.log('Error sending test email: ' + error.toString());
  }
}
