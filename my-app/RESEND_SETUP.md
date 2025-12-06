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

