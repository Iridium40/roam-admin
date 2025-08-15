-- =============================================
-- REVIEWS TABLE SETUP FOR SUPABASE
-- =============================================
-- Run this entire script in your Supabase SQL Editor

-- Drop table if it exists (in case we need to recreate)
DROP TABLE IF EXISTS public.reviews CASCADE;

-- Create reviews table with corrected foreign key constraints
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL,
  overall_rating integer NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
  service_rating integer NULL CHECK (service_rating >= 1 AND service_rating <= 5),
  communication_rating integer NULL CHECK (communication_rating >= 1 AND communication_rating <= 5),
  punctuality_rating integer NULL CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  review_text text NULL,
  is_approved boolean NULL DEFAULT false,
  is_featured boolean NULL DEFAULT false,
  moderated_by uuid NULL,
  moderated_at timestamp with time zone NULL,
  moderation_notes text NULL,
  created_at timestamp with time zone NULL DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_booking_id_unique UNIQUE (booking_id),
  CONSTRAINT reviews_booking_id_fkey FOREIGN KEY (booking_id) REFERENCES bookings (id) ON DELETE CASCADE,
  CONSTRAINT reviews_moderated_by_fkey FOREIGN KEY (moderated_by) REFERENCES admin_users (id)
);

-- Create indexes for performance
CREATE INDEX idx_reviews_booking_id ON public.reviews (booking_id);
CREATE INDEX idx_reviews_overall_rating ON public.reviews (overall_rating);
CREATE INDEX idx_reviews_is_approved ON public.reviews (is_approved);
CREATE INDEX idx_reviews_is_featured ON public.reviews (is_featured);
CREATE INDEX idx_reviews_created_at ON public.reviews (created_at);
CREATE INDEX idx_reviews_moderated_by ON public.reviews (moderated_by);

-- Enable RLS on reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow anon read access" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow admin update access" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Allow anon insert access" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin delete access" ON public.reviews FOR DELETE USING (true);

-- Verify table was created
SELECT 'Reviews table created successfully!' as status;

-- Show table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'reviews' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
