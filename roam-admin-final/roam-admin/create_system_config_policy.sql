CREATE POLICY "Allow anon read access" ON public.system_config FOR SELECT USING (true);
CREATE POLICY "Allow anon insert access" ON public.system_config FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update access" ON public.system_config FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete access" ON public.system_config FOR DELETE USING (true);
