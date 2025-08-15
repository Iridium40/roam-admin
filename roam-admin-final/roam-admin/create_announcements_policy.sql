CREATE POLICY "Allow anon read access" ON public.announcements FOR SELECT USING (true);
