# Gmail SMTP Setup Guide

## Step 1: Enable 2-Step Verification
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click "2-Step Verification"
4. Follow the steps to enable it

## Step 2: Create App Password
1. After enabling 2-Step Verification, go back to Security
2. Under "Signing in to Google", click "App passwords"
3. Select "Mail" as the app
4. Select "Other (Custom name)" as the device
5. Enter "UNAI Antigravity" as the name
6. Click "Generate"
7. **COPY THE 16-CHARACTER PASSWORD** (you'll only see it once!)

## Step 3: Update .env File
Add these lines to your `.env` file:
```
VITE_GMAIL_USER=nobitawellboy@gmail.com
VITE_GMAIL_APP_PASSWORD=your_16_character_password_here
```

Replace `your_16_character_password_here` with the password from Step 2.

## Step 4: Test
1. Submit a job application
2. Check the applicant's email inbox
3. Approve/reject from admin dashboard
4. Check email again

## Troubleshooting
- Make sure 2-Step Verification is enabled
- Use the App Password, NOT your regular Gmail password
- Check spam folder
- Make sure the email in .env matches the one you're using

## Security Note
- Never commit your .env file to Git
- The .env file is already in .gitignore
- App passwords are safer than your main password
