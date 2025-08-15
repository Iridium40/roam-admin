-- Enable RLS on reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to approved reviews
CREATE POLICY "Allow anon read approved reviews" ON public.reviews
FOR SELECT USING (is_approved = true);

-- Allow authenticated users to read all reviews
CREATE POLICY "Allow authenticated read access" ON public.reviews
FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert reviews
CREATE POLICY "Allow authenticated insert" ON public.reviews
FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to update reviews
CREATE POLICY "Allow authenticated update" ON public.reviews
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated users to delete reviews
CREATE POLICY "Allow authenticated delete" ON public.reviews
FOR DELETE TO authenticated USING (true);

-- Related tables policies (if not already created)
-- These may already exist, but are needed for the joins to work with business_id
-- CREATE POLICY "Allow anon read access" ON public.bookings FOR SELECT USING (true);
-- CREATE POLICY "Allow anon read access" ON public.customer_profiles FOR SELECT USING (true);
-- CREATE POLICY "Allow anon read access" ON public.business_profiles FOR SELECT USING (true);
-- CREATE POLICY "Allow anon read access" ON public.providers FOR SELECT USING (true);
-- CREATE POLICY "Allow anon read access" ON public.services FOR SELECT USING (true);
-- CREATE POLICY "Allow anon read access" ON public.admin_users FOR SELECT USING (true);
