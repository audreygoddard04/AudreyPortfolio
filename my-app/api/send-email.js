const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML escape function to prevent XSS in email content
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  // Always set JSON content type and CORS headers first
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check for required environment variables
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ 
      error: 'Server configuration error',
      message: 'Email service is not configured. Please contact the administrator.'
    });
  }

  try {
    const { name, email, businessName, projectType, otherSpecify, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Build email content with HTML escaping
    const projectTypeText = projectType === 'other' 
      ? `Other: ${escapeHtml(otherSpecify || 'Not specified')}` 
      : escapeHtml(projectType || 'Not specified');

    // Escape message and convert newlines to <br> safely
    const escapedMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const emailHtml = `
      <h2>New Website Design Inquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${businessName ? `<p><strong>Business/Organization:</strong> ${escapeHtml(businessName)}</p>` : ''}
      <p><strong>Project Type:</strong> ${projectTypeText}</p>
      <p><strong>Message:</strong></p>
      <p>${escapedMessage}</p>
    `;

    const emailText = `
New Website Design Inquiry

Name: ${name}
Email: ${email}
${businessName ? `Business/Organization: ${businessName}\n` : ''}Project Type: ${projectTypeText}

Message:
${message}
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'your-email@example.com',
      replyTo: email,
      subject: `Website Design Inquiry from ${escapeHtml(name)}`,
      html: emailHtml,
      text: emailText,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: data.id 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    // Always return JSON, never let errors crash the function
    return res.status(500).json({ 
      error: 'Failed to send email',
      message: error.message || 'An unexpected error occurred'
    });
  }
};

// Export as default for Vercel
module.exports.default = module.exports;

