-- Create RLS policy to allow reading business_locations table
-- Run this in your Supabase SQL editor:

CREATE POLICY "Allow anon read access" ON public.business_locations FOR SELECT USING (true);

-- If you get policy already exists error, you can drop and recreate:
-- DROP POLICY IF EXISTS "Allow anon read access" ON public.business_locations;
