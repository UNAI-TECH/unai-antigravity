# Vercel Deployment Guide

## ✅ What's Configured

1. **vercel.json** - Handles routing (prevents 404 errors)
2. **EmailJS** - Works automatically (no env vars needed!)
3. **Supabase** - Already configured in your .env

## 🚀 Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect Vite
4. Click "Deploy"
5. Done! ✅

### Option 2: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

## ⚙️ Environment Variables (If Needed)

If you want to hide your Supabase keys (optional), add these in Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = `https://rjesdriketvcjlpbkwdp.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your_key_here`

**Note:** EmailJS keys DON'T need to be in environment variables - they're meant to be public and work from the browser.

## 📧 Email After Deployment

Emails will work automatically after deployment because:
- ✅ EmailJS works from the browser (client-side)
- ✅ No backend/serverless functions needed
- ✅ No additional configuration required

## 🔧 Routing Fix

The `vercel.json` file ensures:
- ✅ All routes work (no 404 on refresh)
- ✅ Direct URL access works
- ✅ React Router works properly

## 🧪 Test After Deployment

1. Visit your deployed site
2. Submit a job application
3. Check the applicant's email
4. Go to admin dashboard
5. Approve/reject the application
6. Check email again

All emails should work perfectly!

## 🎯 Current Configuration

- **Service ID:** `service_g9f0piz`
- **Template ID:** `template_dmg2kik`
- **Public Key:** `Aq6CjehcH-3ufmJQB`

These are already in your code and will work in production.

## 📝 Important Notes

1. **No .env needed in Vercel** for EmailJS (it's client-side)
2. **vercel.json handles routing** (already created)
3. **Emails work immediately** after deployment
4. **Free tier:** 200 emails/month with EmailJS

## 🔍 If Emails Don't Work After Deployment

1. Check browser console for errors
2. Verify EmailJS template is saved correctly
3. Make sure Gmail is connected in EmailJS dashboard
4. Check EmailJS dashboard for delivery logs

That's it! Just deploy and it will work! 🎉
