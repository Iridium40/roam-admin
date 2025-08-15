-- First, you need to create a user in Supabase Auth through the dashboard
-- Then run this script to add them to the admin_users table

-- Example: Replace 'your-auth-user-id' with the actual UUID from the auth.users table
-- and update the email to match
INSERT INTO public.admin_users (
  user_id,
  email,
  first_name,
  last_name,
  role,
  permissions,
  is_active
) VALUES (
  'your-auth-user-id', -- Replace with actual user UUID from auth.users
  'admin@example.com', -- Replace with actual email
  'Admin',
  'User',
  'admin', -- Assuming this is a valid value for your user_role enum
  '["all"]'::jsonb,
  true
);

-- To find the user_id from auth.users, you can run:
-- SELECT id, email FROM auth.users;
