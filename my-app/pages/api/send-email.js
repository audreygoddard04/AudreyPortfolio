/**
 * send-email.js  (pages/api/send-email.js)
 *
 * Next.js Pages Router API route — runs as a Vercel serverless function.
 * Receives a POST request from the Contact form, validates the payload,
 * and sends an email via the Resend API.
 *
 * Required environment variables (set in Vercel project settings or .env.local):
 *   RESEND_API_KEY   — Your Resend secret key
 *   RESEND_FROM_EMAIL — "From" address (must be a verified sender in Resend)
 *   RESEND_TO_EMAIL  — Where incoming inquiries should be delivered
 */

import { Resend } from 'resend';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Escapes HTML special characters to prevent XSS in the email HTML body.
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export default async function handler(req, res) {
  // Always respond with JSON and allow cross-origin requests from the site
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Guard: ensure the email service is configured before doing any work
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({
      error: 'Server configuration error',
      message: 'Email service is not configured. Please contact the administrator.',
    });
  }

  try {
    const { name, email, businessName, projectType, otherSpecify, message } = req.body;

    // --- Validation ---

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // --- Build email content ---

    const projectTypeText =
      projectType === 'other'
        ? `Other: ${escapeHtml(otherSpecify || 'Not specified')}`
        : escapeHtml(projectType || 'Not specified');

    // Escape message and render newlines as <br> tags in the HTML version
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

    // Plain-text fallback for email clients that don't render HTML
    const emailText = `
New Website Design Inquiry

Name: ${name}
Email: ${email}
${businessName ? `Business/Organization: ${businessName}\n` : ''}Project Type: ${projectTypeText}

Message:
${message}
    `.trim();

    // --- Send via Resend ---

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'your-email@example.com',
      replyTo: email,
      subject: `Website Design Inquiry from ${escapeHtml(name)}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({
        error: 'Failed to send email',
        message: error.message || 'Email service returned an error',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      id: data?.id || 'unknown',
    });

  } catch (err) {
    console.error('Error sending email:', err);
    // Always return JSON — never let an uncaught error produce an HTML 500 page
    return res.status(500).json({
      error: 'Failed to send email',
      message: err.message || 'An unexpected error occurred',
    });
  }
}
