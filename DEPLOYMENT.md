# Uniboe Deployment Guide

This guide walks you through deploying Uniboe to Vercel (frontend) and Railway (backend) with custom domain uniboe.com.

## Prerequisites

- GitHub repository: https://github.com/Vishwa032/uniboe-latest-platform
- Vercel account (free tier works)
- Railway account with active plan
- Domain: uniboe.com (already owned)
- Supabase project with configured database

## Part 1: Deploy Backend to Railway

### Step 1: Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose `Vishwa032/uniboe-latest-platform`
5. Railway will auto-detect Python and start building

### Step 2: Configure Environment Variables

In Railway project settings, add these environment variables:

```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Settings
FRONTEND_URL=https://uniboe.com

# Python Path
PYTHONPATH=/app
```

### Step 3: Configure Build & Start Commands

In Railway settings:
- **Build Command**: `pip install -r backend/requirements.txt`
- **Start Command**: `uvicorn backend.api.main:app --host 0.0.0.0 --port $PORT`

### Step 4: Get Railway Backend URL

After deployment, Railway will provide a URL like:
```
https://uniboe-backend-production.up.railway.app
```

Save this URL - you'll need it for Vercel configuration.

### Step 5: Configure Custom Domain (Optional)

In Railway project settings:
1. Go to "Settings" → "Domains"
2. Add custom domain: `api.uniboe.com`
3. Add the CNAME record to your domain DNS:
   - Name: `api`
   - Value: [Railway provided value]

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Import Project to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import `Vishwa032/uniboe-latest-platform`
4. Vercel will auto-detect Vite

### Step 2: Configure Build Settings

In Vercel project settings:
- **Framework Preset**: Vite
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Configure Environment Variables

Add these environment variables in Vercel:

```bash
# Backend API URL (use Railway URL from Part 1)
VITE_API_URL=https://uniboe-backend-production.up.railway.app

# Or if using custom domain:
# VITE_API_URL=https://api.uniboe.com
```

### Step 4: Update vercel.json

Before deploying, update the `vercel.json` file with your actual Railway backend URL:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://YOUR_RAILWAY_URL_HERE/api/:path*"
    }
  ]
}
```

### Step 5: Deploy

Click "Deploy" in Vercel. The build should complete in 2-3 minutes.

### Step 6: Configure Custom Domain

1. In Vercel project settings, go to "Domains"
2. Add domain: `uniboe.com`
3. Vercel will provide DNS records to add:

**For root domain (uniboe.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel IP)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

4. Add these records to your domain registrar's DNS settings
5. Wait for DNS propagation (usually 5-30 minutes)

---

## Part 3: Update Frontend API Configuration

After Railway deployment, update the frontend to use the correct backend URL.

### Option 1: Using Environment Variables (Recommended)

Create `.env.production` in the project root:

```bash
VITE_API_URL=https://YOUR_RAILWAY_URL_HERE
```

### Option 2: Update client/src/lib/api.ts

Find the base URL configuration and update it:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://YOUR_RAILWAY_URL_HERE';
```

---

## Part 4: Post-Deployment Verification

### Test Backend

```bash
curl https://YOUR_RAILWAY_URL/api/health
# Should return: {"status":"healthy"}
```

### Test Frontend

1. Visit https://uniboe.com
2. Try to sign up with a test account
3. Check browser console for any API errors
4. Verify login/logout works
5. Test all main features:
   - Housing listings
   - Community posts
   - Messages
   - Profile

### Common Issues

**CORS Errors:**
- Verify `FRONTEND_URL` in Railway matches your Vercel domain
- Check that backend CORS middleware allows your frontend origin

**API Connection Failed:**
- Verify `VITE_API_URL` in Vercel environment variables
- Check Railway backend is running (check logs)
- Verify Railway service is publicly accessible

**Database Connection Errors:**
- Verify Supabase credentials in Railway
- Check Supabase project is active and accessible
- Verify database tables exist

---

## Part 5: Domain DNS Configuration

Add these DNS records at your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare):

```
# Frontend (Vercel)
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600

# Backend API (Railway) - Optional if using custom subdomain
Type: CNAME
Name: api
Value: [Railway provided CNAME]
TTL: 3600
```

---

## Deployment Checklist

- [ ] Railway backend deployed and running
- [ ] Railway environment variables configured
- [ ] Railway backend URL noted
- [ ] Vercel frontend project created
- [ ] Vercel environment variables set with Railway URL
- [ ] vercel.json updated with Railway URL
- [ ] Frontend deployed to Vercel
- [ ] Custom domain added to Vercel
- [ ] DNS records configured
- [ ] SSL certificate active (Vercel auto-provisions)
- [ ] Tested signup/login flow
- [ ] Tested all main features
- [ ] Verified API connections work

---

## Monitoring & Logs

### Railway Logs
```bash
# View in Railway dashboard
Project → Deployments → View Logs
```

### Vercel Logs
```bash
# View in Vercel dashboard
Project → Deployments → [Select deployment] → View Function Logs
```

---

## Cost Breakdown

**Railway:**
- Starter Plan: $5/month
- Includes: 500 hours of usage, $5 credit

**Vercel:**
- Hobby Plan: Free
- Includes: Unlimited deployments, automatic SSL

**Supabase:**
- Free tier
- Includes: 500MB database, 1GB file storage

**Total Monthly Cost: ~$5/month**

---

## Support

For issues or questions:
- Check Railway logs for backend errors
- Check Vercel logs for frontend build errors
- Check browser console for client-side errors
- Verify all environment variables are set correctly
