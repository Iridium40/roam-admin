# Vercel Deployment Guide for ROAM Admin Dashboard

## Prerequisites
- Vercel account
- Supabase project configured
- GitHub repository connected

## Environment Variables Setup

### 1. In Vercel Dashboard
Go to your project settings and add these environment variables:

```
VITE_SUPABASE_URL=https://vssomyuyhicaxsgiaupo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzc29teXV5aGljYXhzZ2lhdXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTM3MTUsImV4cCI6MjA2OTAyOTcxNX0.c4JrNgMGsrCaFP2VrF4pL6iUG8Ub8Hkcrm5345r7KHs
PING_MESSAGE=ping pong
```

### 2. Build Configuration
The project is configured to build both client and server:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/spa`
- **Install Command**: `npm install`

## Deployment Steps

### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `Iridium40/roam-admin`
4. Select the repository

### 2. Configure Project
- **Framework Preset**: Other
- **Root Directory**: `./` (leave empty)
- **Build Command**: `npm run build`
- **Output Directory**: `dist/spa`
- **Install Command**: `npm install`

### 3. Environment Variables
Add the environment variables listed above in the Vercel dashboard.

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## API Routes

The following API routes are available:
- `/api/ping` - Health check
- `/api/demo` - Demo endpoint
- `/api/system-config` - System configuration

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally first

2. **Environment Variables**
   - Verify all environment variables are set in Vercel
   - Check that Supabase URL and key are correct

3. **API Routes Not Working**
   - Ensure API routes are in the `/api` directory
   - Check that routes export default functions

### Build Logs
If deployment fails, check the build logs in Vercel dashboard for specific error messages.

## Post-Deployment

1. **Test the Application**
   - Visit your deployed URL
   - Test admin login functionality
   - Verify Supabase connection

2. **Set up Custom Domain** (Optional)
   - Go to project settings in Vercel
   - Add your custom domain

3. **Monitor Performance**
   - Use Vercel Analytics to monitor performance
   - Check function execution logs

## Security Notes

- Environment variables are encrypted in Vercel
- API routes are serverless functions
- Supabase connection uses environment variables
- CORS is configured for API routes

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify environment variables
3. Test locally with `npm run dev`
4. Check Supabase connection status
