# Resend Email Setup Guide

This guide will help you set up Resend for sending emails from your contact form.

## Prerequisites

1. A Resend account (sign up at https://resend.com)
2. A verified domain or use Resend's test domain

## Setup Steps

### 1. Get Your Resend API Key

1. Log in to your Resend account
2. Go to **API Keys** in the dashboard
3. Click **Create API Key**
4. Give it a name (e.g., "Portfolio Contact Form")
5. Copy the API key (you'll only see it once!)

### 2. Configure Environment Variables

1. Open the `.env.local` file in the root of `my-app/`
2. Replace `your_resend_api_key_here` with your actual Resend API key
3. Update `RESEND_FROM_EMAIL` with a verified email address from Resend
   - For testing, you can use `onboarding@resend.dev`
   - For production, use an email from your verified domain
4. Update `RESEND_TO_EMAIL` with the email address where you want to receive contact form submissions

Example `.env.local`:
```
RESEND_API_KEY=re_1234567890abcdef
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_TO_EMAIL=your-email@example.com
```

### 3. Verify Your Domain (Production)

For production use:
1. Go to **Domains** in your Resend dashboard
2. Add your domain
3. Add the DNS records provided by Resend to your domain's DNS settings
4. Wait for verification (usually takes a few minutes)

### 4. Deploy to Vercel

1. Make sure your `.env.local` is configured (it won't be committed to git)
2. In your Vercel project settings:
   - Go to **Settings** → **Environment Variables**
   - Add the following variables:
     - `RESEND_API_KEY` = your API key
     - `RESEND_FROM_EMAIL` = your from email
     - `RESEND_TO_EMAIL` = your receiving email
3. Redeploy your site

## Testing

### Local Development

For local development, you have two options:

**Option 1: Use Vercel CLI (Recommended)**
```bash
npm install -g vercel
vercel dev
```
This will run your app with serverless functions locally.

**Option 2: Test in Production**
Deploy to Vercel and test the contact form on your live site.

## File Structure

- `/api/send-email.js` - Serverless function that handles email sending
- `/app/api/` - Reserved for future API routes
- `/app/auth/` - Reserved for future authentication routes
- `.env.local` - Your local environment variables (not committed to git)
- `.env.example` - Example environment variables file

## Troubleshooting

### Emails not sending?

1. Check that your API key is correct in Vercel environment variables
2. Verify your `RESEND_FROM_EMAIL` is verified in Resend
3. Check Vercel function logs for errors
4. Make sure CORS is properly configured (already set up in the API function)

### Getting CORS errors?

The API function already includes CORS headers. If you're still getting errors, check:
- The API endpoint URL is correct (`/api/send-email`)
- You're making a POST request
- The Content-Type header is set to `application/json`

## Support

For Resend-specific issues, check the [Resend documentation](https://resend.com/docs).


## Newsletter names and personalized welcome

Every newsletter signup now requires first name, last name, email, and a Male/Female selection. Resend stores standard `firstName` and `lastName`, plus string contact properties `gender` and `salutation`. The site calculates `Mr. [last name]` for Male and `Ms. [last name]` for Female before triggering `keltner.subscribed`. Analytics never receives these personal fields.

The `gender` and `salutation` property definitions were created in the connected Resend account on September 28, 2026. For a different Resend account, run from `my-app`:

```sh
node --env-file=.env.local scripts/setup-newsletter-properties.mjs
```

This idempotent setup creates property definitions only; it does not enroll contacts or send email. Existing subscribers are not assigned inferred genders. `salutation` has the neutral fallback `Reader`.

### Update the existing welcome email in Resend

1. In **Automations**, open **KELTNER — Welcome to the Classics**. Its trigger is `keltner.subscribed`. Open its **Send email** step and the selected template (ID `62cbff43-1c4a-4d14-bcbe-368663e06405`).
2. In that template, add a **string** variable named `SALUTATION`, with fallback `Reader`. In the visual editor, type `{{` or choose **Variable** to insert it. Start the message with `Dear [SALUTATION variable],`. In HTML the greeting is `<p>Dear {{{SALUTATION}}},</p>`. The repository copy is `emails/keltner-welcome.html`.
3. In the automation's Send email step, bind the template variable `SALUTATION` to the contact's `salutation` property. The API representation within the existing template configuration is:

```json
{
  "id": "62cbff43-1c4a-4d14-bcbe-368663e06405",
  "variables": {
    "SALUTATION": { "var": "contact.properties.salutation" }
  }
}
```

4. Preview with `Ms. Goddard`, `Mr. Smith`, and the fallback `Reader`. Publish the template and save the automation changes; keep its existing sender, trigger, and unsubscribe link. If you choose to send a test email, use your own address.

The local HTML change does **not** automatically edit the published Resend template. The published welcome and automation were left unchanged, so these dashboard steps are still required. Updating the template does not resend welcomes to existing subscribers. For future newsletters, insert the `salutation` contact property using Resend's personalization picker; do not guess an existing reader's title when their information is absent.

Official documentation: [Template variables](https://resend.com/docs/dashboard/templates/template-variables) and [Automation Send Email](https://resend.com/docs/dashboard/automations/send-email).
