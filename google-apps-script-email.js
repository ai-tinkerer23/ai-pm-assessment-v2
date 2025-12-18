/**
 * AI Skills Assessment - Email Webhook Handler
 * Receives assessment results and sends formatted HTML email to user
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to Google Apps Script: https://script.google.com
 * 2. Create new project
 * 3. Copy this code into the editor
 * 4. Deploy as Web App (Deploy > New deployment > Web app)
 * 5. Set "Execute as: Me" and "Who has access: Anyone"
 * 6. Copy the web app URL and update it in index.html line 3287
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);

    // Send HTML email to user
    MailApp.sendEmail({
      to: data.email,
      subject: 'Your AI PM Assessment Results',
      htmlBody: data.emailHTML
    });

    // Optional: Also log to a Google Sheet for your records
    logToSheet(data);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log error
    Logger.log('Error: ' + error.toString());

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
 */
function logToSheet(data) {
  try {
    // Get or create the spreadsheet (you can replace with your own sheet ID)
    const ss = SpreadsheetApp.getActiveSpreadsheet();

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

  } catch (error) {
    // Log sheet errors but don't fail the email send
    Logger.log('Sheet logging error: ' + error.toString());
  }
}

/**
 * Test function - run this to test the webhook
 */
function testWebhook() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: "test@example.com",
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
  Logger.log(result.getContent());
}
