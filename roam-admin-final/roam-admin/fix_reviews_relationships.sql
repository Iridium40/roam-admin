-- Update reviews table to add the missing foreign key columns
-- Run this in your Supabase SQL Editor

-- Add the missing foreign key columns
ALTER TABLE public.reviews 
ADD COLUMN IF NOT EXISTS providers_id uuid REFERENCES providers(id),
ADD COLUMN IF NOT EXISTS business_id uuid REFERENCES business_profiles(id),
ADD COLUMN IF NOT EXISTS customer_id uuid REFERENCES customer_profiles(id);

-- Create indexes for the new foreign key columns
CREATE INDEX IF NOT EXISTS idx_reviews_providers_id ON public.reviews (providers_id);
CREATE INDEX IF NOT EXISTS idx_reviews_business_id ON public.reviews (business_id);
CREATE INDEX IF NOT EXISTS idx_reviews_customer_id ON public.reviews (customer_id);

-- Verify the updated table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'reviews' 
  AND table_schema = 'public'
ORDER BY ordinal_position;
