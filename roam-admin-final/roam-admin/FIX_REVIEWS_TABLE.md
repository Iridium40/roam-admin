# Fix Reviews Table Error

## Issue

The application is throwing an error: `relation "reviews" does not exist`. This means the reviews table hasn't been created in your Supabase database yet.

## Solution

You need to create the reviews table in your Supabase database.

## Steps to Fix

### 1. Open Supabase SQL Editor

- Go to your [Supabase Dashboard](https://supabase.com/dashboard)
- Navigate to **SQL Editor**

### 2. Execute the Reviews Table SQL

Copy and paste the entire contents of `setup_reviews_table.sql` into the SQL Editor and execute it.

This will:

- Create the `reviews` table with all necessary columns
- Set up proper foreign key constraints to `bookings` and `admin_users` tables
- Create performance indexes
- Enable Row Level Security (RLS)
- Create necessary RLS policies for reading, updating, and inserting reviews

### 3. Verify the Table Was Created

After running the SQL, you can verify the table exists by running this query:

```sql
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'reviews';
```

### 4. Test the Application

Once the table is created, the review moderation functionality should work without errors.

## What This Fixes

- Resolves the "relation reviews does not exist" error
- Enables review approval/disapproval functionality
- Allows admin users to moderate reviews
- Sets up proper foreign key relationships for data integrity

## Important Notes

- The `moderated_by` field now correctly references the `admin_users` table (not `auth.users`)
- This ensures the foreign key constraint will work with the admin user IDs
- RLS policies are set up to allow appropriate access to the reviews data
