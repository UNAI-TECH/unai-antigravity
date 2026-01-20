# Complete Gmail SMTP Email Setup

## ✅ What I've Done

1. **Installed nodemailer** - For Gmail SMTP integration
2. **Created Netlify serverless function** - Secure backend email handler
3. **Updated email service** - Now calls the backend function
4. **Added .env configuration** - For Gmail credentials

## 🔧 Setup Steps (IMPORTANT!)

### Step 1: Enable Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App Passwords** (https://myaccount.google.com/apppasswords)
4. Create a new app password:
   - App: Mail
   - Device: Other (Custom name) → "UNAI Antigravity"
5. **Copy the 16-character password** (shown only once!)

### Step 2: Update .env File

Open your `.env` file and replace `your_app_password_here` with the password from Step 1:

```
VITE_GMAIL_USER=nobitawellboy@gmail.com
VITE_GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  (paste your 16-char password)
```

### Step 3: Test Locally with Netlify Dev

Run this command to test locally:
```bash
npx netlify dev
```

This will start:
- Your Vite app on port 5173
- Netlify functions on port 8888

### Step 4: Test the Email

1. Go to http://localhost:8888 (or whatever port Netlify Dev shows)
2. Submit a job application
3. Check the applicant's email inbox
4. Approve/reject from admin
5. Check email again

## 🚀 Deployment

When you deploy to Netlify:

1. Go to your Netlify dashboard
2. Site settings → Environment variables
3. Add these two variables:
   - `GMAIL_USER` = nobitawellboy@gmail.com
   - `GMAIL_APP_PASSWORD` = (your 16-char password)

## 🔍 Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Check that you're using the App Password (not regular Gmail password)
3. Verify 2-Step Verification is enabled
4. Check spam folder
5. Look at Netlify function logs

### Local development not working?
- Make sure you're running `npx netlify dev` (not `npm run dev`)
- Check that port 8888 is not in use
- Verify .env file has correct values

### Still not working?
Check the browser console - it will show detailed error messages from the email service.

## 📧 How It Works

1. **User submits application** → Frontend calls `/. netlify/functions/send-email`
2. **Netlify function** → Uses nodemailer + Gmail SMTP
3. **Gmail sends email** → To applicant's email address
4. **Same for approve/reject** → Admin action triggers email

## ✨ Benefits

- ✅ Works with ANY email address (not just yours)
- ✅ Sends from your actual Gmail (nobitawellboy@gmail.com)
- ✅ Secure (credentials never exposed to frontend)
- ✅ Free (Gmail allows 500 emails/day)
- ✅ Reliable delivery
