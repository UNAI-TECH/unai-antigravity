# Email Setup Guide for UNAI Antigravity

## Problem
The database trigger approach with `pg_net` can be unreliable. We'll use a simpler client-side approach with a proper email service.

## Solution: Use Resend directly from the frontend

### Step 1: Install Resend SDK
Run this command in your project:
```bash
npm install resend
```

### Step 2: Update your .env file
Add this line to your `.env` file:
```
VITE_RESEND_API_KEY=re_eccQtPPo_92WCpMU5bA8AvzXjj786BQgU
```

### Step 3: Verify Your Domain (IMPORTANT!)
1. Go to https://resend.com/domains
2. Add your domain (or use a test email for development)
3. **For Testing**: You can only send to YOUR verified email address with the free tier
4. **For Production**: You need to verify a domain to send to any email

### Step 4: Update the sender email
In the code, change from `onboarding@resend.dev` to:
- For testing: Use your verified email
- For production: Use `noreply@yourdomain.com` after domain verification

### Step 5: Run the updated code
The new implementation will:
1. Send "Application Received" email when user submits
2. Send "Approved" or "Rejected" email when admin changes status

### Troubleshooting
If emails still don't arrive:
1. Check your spam folder
2. Verify you're testing with YOUR Resend account email
3. Check Resend dashboard for delivery logs: https://resend.com/emails
4. Make sure your API key is correct and active

### Alternative: Use a different service
If Resend doesn't work, we can switch to:
- SendGrid (free tier: 100 emails/day)
- Mailgun (free tier: 5000 emails/month)
- Amazon SES (very cheap, reliable)

Let me know which option you prefer!
