-- Create RLS policy to allow reading provider_services table
-- Run this in your Supabase SQL editor:

CREATE POLICY "Allow anon read access" ON public.provider_services FOR SELECT USING (true);

-- Also create policy for provider_addons table
CREATE POLICY "Allow anon read access" ON public.provider_addons FOR SELECT USING (true);

-- If you get policy already exists errors, you can drop and recreate:
-- DROP POLICY IF EXISTS "Allow anon read access" ON public.provider_services;
-- DROP POLICY IF EXISTS "Allow anon read access" ON public.provider_addons;
