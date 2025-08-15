-- Storage policies for roam-file-storage bucket

-- Policy: Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload own avatar" ON storage.objects
    FOR INSERT 
    WITH CHECK (
        bucket_id = 'roam-file-storage' 
        AND (storage.foldername(name))[1] = 'avatar-admin-user'
        AND auth.uid()::text = (string_to_array(storage.filename(name), '-'))[1]
    );

-- Policy: Allow authenticated users to view their own avatar
CREATE POLICY "Users can view own avatar" ON storage.objects
    FOR SELECT 
    USING (
        bucket_id = 'roam-file-storage' 
        AND (storage.foldername(name))[1] = 'avatar-admin-user'
        AND auth.uid()::text = (string_to_array(storage.filename(name), '-'))[1]
    );

-- Policy: Allow authenticated users to update their own avatar
CREATE POLICY "Users can update own avatar" ON storage.objects
    FOR UPDATE 
    USING (
        bucket_id = 'roam-file-storage' 
        AND (storage.foldername(name))[1] = 'avatar-admin-user'
        AND auth.uid()::text = (string_to_array(storage.filename(name), '-'))[1]
    );

-- Policy: Allow authenticated users to delete their own avatar
CREATE POLICY "Users can delete own avatar" ON storage.objects
    FOR DELETE 
    USING (
        bucket_id = 'roam-file-storage' 
        AND (storage.foldername(name))[1] = 'avatar-admin-user'
        AND auth.uid()::text = (string_to_array(storage.filename(name), '-'))[1]
    );

-- Policy: Allow public read access to all files in roam-file-storage (for displaying images)
CREATE POLICY "Public read access for roam-file-storage" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'roam-file-storage');

-- Alternative approach: Admin users can manage all files in avatar-admin-user folder
CREATE POLICY "Admin users can manage all avatars" ON storage.objects
    FOR ALL 
    USING (
        bucket_id = 'roam-file-storage' 
        AND (storage.foldername(name))[1] = 'avatar-admin-user'
        AND EXISTS (
            SELECT 1 FROM public.admin_users au 
            WHERE au.user_id = auth.uid() 
            AND au.role = 'admin' 
            AND au.is_active = true
        )
    );
