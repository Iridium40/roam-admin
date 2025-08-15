-- Promotions table policies
CREATE POLICY "Allow anon read access" ON public.promotions FOR SELECT USING (true);
CREATE POLICY "Allow anon insert access" ON public.promotions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update access" ON public.promotions FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete access" ON public.promotions FOR DELETE USING (true);

-- Promotion usage table policies
CREATE POLICY "Allow anon read access" ON public.promotion_usage FOR SELECT USING (true);
CREATE POLICY "Allow anon insert access" ON public.promotion_usage FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anon update access" ON public.promotion_usage FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete access" ON public.promotion_usage FOR DELETE USING (true);
