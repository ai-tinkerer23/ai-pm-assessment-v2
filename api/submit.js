// Vercel Serverless Function to handle assessment submissions
// This acts as a proxy to avoid CORS issues with Make.com webhook

export default async function handler(req, res) {
  // Enable CORS for your domain
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed. Use POST.' 
    });
  }

  try {
    // Get the assessment data from request body
    const resultsData = req.body;

    // Validate required fields
    if (!resultsData.email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    console.log('Forwarding submission to Make.com for:', resultsData.email);

    // Forward to Make.com webhook
    const webhookResponse = await fetch(
      'https://hook.us2.make.com/l3qiduskkmptas82yzc2kd9t63zql8a0',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultsData)
      }
    );

    // Check if Make.com accepted the data
    if (webhookResponse.ok || webhookResponse.status === 200) {
      console.log('Successfully sent to Make.com');
      return res.status(200).json({ 
        success: true, 
        message: 'Results sent successfully! Check your email.' 
      });
    } else {
      console.error('Make.com webhook error:', webhookResponse.status);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to process submission. Please try again.' 
      });
    }

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
}
