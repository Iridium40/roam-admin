-- Enable RLS on admin_users table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to read their own admin_users record
CREATE POLICY "Users can read own admin_users record" ON public.admin_users
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy: Allow authenticated users to update their own admin_users record
CREATE POLICY "Users can update own admin_users record" ON public.admin_users
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Policy: Allow authenticated users to insert their own admin_users record
CREATE POLICY "Users can insert own admin_users record" ON public.admin_users
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy: Allow admin users to read all admin_users records
CREATE POLICY "Admin users can read all admin_users records" ON public.admin_users
    FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role = 'admin' 
            AND au.is_active = true
        )
    );

-- Policy: Allow admin users to update all admin_users records
CREATE POLICY "Admin users can update all admin_users records" ON public.admin_users
    FOR UPDATE 
    USING (
        EXISTS (
            SELECT 1 FROM public.admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role = 'admin' 
            AND au.is_active = true
        )
    );
