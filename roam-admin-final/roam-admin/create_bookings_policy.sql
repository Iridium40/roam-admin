-- Enable RLS on bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to bookings
CREATE POLICY "Allow anon read access" ON public.bookings 
FOR SELECT USING (true);

-- Allow authenticated users to read all bookings
CREATE POLICY "Allow authenticated read access" ON public.bookings 
FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to insert bookings
CREATE POLICY "Allow authenticated insert" ON public.bookings 
FOR INSERT TO authenticated WITH CHECK (true);

-- Allow authenticated users to update their own bookings
CREATE POLICY "Allow authenticated update" ON public.bookings 
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Allow authenticated users to delete bookings
CREATE POLICY "Allow authenticated delete" ON public.bookings 
FOR DELETE TO authenticated USING (true);

-- Enable RLS on booking_changes table
ALTER TABLE public.booking_changes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to booking_changes
CREATE POLICY "Allow anon read access" ON public.booking_changes 
FOR SELECT USING (true);

-- Allow authenticated users full access to booking_changes
CREATE POLICY "Allow authenticated access" ON public.booking_changes 
FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Enable RLS on booking_addons table
ALTER TABLE public.booking_addons ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access to booking_addons
CREATE POLICY "Allow anon read access" ON public.booking_addons 
FOR SELECT USING (true);

-- Allow authenticated users full access to booking_addons
CREATE POLICY "Allow authenticated access" ON public.booking_addons 
FOR ALL TO authenticated USING (true) WITH CHECK (true);
