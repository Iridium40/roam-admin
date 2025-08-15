# Database Setup Instructions

## Issue

When trying to create categories or subcategories with new types, you may encounter an error like:

```
Database setup required!
The function 'add_category_type' doesn't exist in your database.
```

## Solution

You need to create database functions that allow the application to automatically add new enum values.

## Steps to Fix

### 1. Open Supabase SQL Editor

- Go to your [Supabase Dashboard](https://supabase.com/dashboard)
- Navigate to **SQL Editor**

### 2. Run the Database Functions

Copy and paste the entire contents of `enum_management_functions.sql` into the SQL Editor and execute it.

This will create the following functions:

- `add_category_type(text)` - Adds new category types
- `add_subcategory_type(text)` - Adds new subcategory types
- `get_category_types()` - Lists all category types
- `get_subcategory_types()` - Lists all subcategory types

### 3. Verify Setup

After running the SQL, try creating a category or subcategory with a new type. The application should now automatically add the new enum value and create the record.

## Manual Alternative

If you prefer not to use the automated functions, you can manually add enum values:

```sql
-- Add a new category type
ALTER TYPE service_category_types ADD VALUE 'wellness';

-- Add a new subcategory type
ALTER TYPE service_subcategory_types ADD VALUE 'injectables';
```

## Troubleshooting

### Permission Issues

If you get permission errors, make sure you're logged in as a database admin in Supabase.

### Function Already Exists

If you see "function already exists" errors, that's normal - the functions are being recreated.

### Still Getting Errors

If you continue to have issues after running the SQL:

1. Check the Supabase logs for any error details
2. Verify your database user has the necessary permissions
3. Try manually adding the enum value as shown above
