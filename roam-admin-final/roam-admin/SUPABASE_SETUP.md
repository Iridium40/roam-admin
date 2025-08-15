# Supabase Setup Instructions

This application requires Supabase environment variables to be configured for the database and authentication to work properly.

## Required Environment Variables

The following environment variables must be set:

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase public anon key

## How to Set Environment Variables

### Option 1: Using DevServerControl Tool (Recommended)

Use the DevServerControl tool to set the environment variables securely:

1. Set the Supabase URL:

   ```
   set_env_variable: ["VITE_SUPABASE_URL", "https://your-project.supabase.co"]
   ```

2. Set the Supabase anon key:
   ```
   set_env_variable: ["VITE_SUPABASE_ANON_KEY", "your-public-anon-key"]
   ```

### Option 2: Using .env file (Not recommended for production)

You can add these to your `.env` file for local development:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

## Where to Find Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy the following:
   - **URL**: This is your `VITE_SUPABASE_URL`
   - **anon public**: This is your `VITE_SUPABASE_ANON_KEY`

## Database Schema

The application expects the following database schema to be set up in your Supabase project. You can find the SQL files in the project root:

- `create_admin_users_policy.sql`
- `create_business_profiles_policy.sql`
- `create_providers_policy.sql`
- `create_storage_policy.sql`
- And other related policy files

## Troubleshooting

### Error: Missing environment variable: VITE_SUPABASE_URL

This error occurs when the Supabase URL is not configured. Follow the steps above to set the environment variables.

### Error: Missing environment variable: VITE_SUPABASE_ANON_KEY

This error occurs when the Supabase anon key is not configured. Follow the steps above to set the environment variables.

### Authentication Issues

If you're experiencing authentication issues:

1. Verify your environment variables are set correctly
2. Check your Supabase project settings
3. Ensure RLS (Row Level Security) policies are properly configured
4. Check browser console for detailed error messages

## Security Notes

- Never commit sensitive credentials to your repository
- Use the DevServerControl tool for setting sensitive environment variables
- The anon key is safe to expose in client-side code as it's public
- Ensure proper RLS policies are in place to secure your data
