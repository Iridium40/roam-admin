-- Create reviews table with corrected foreign key constraints
CREATE TABLE IF NOT EXISTS public.reviews (
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
) TABLESPACE pg_default;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON public.reviews USING btree (booking_id) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_reviews_overall_rating ON public.reviews USING btree (overall_rating) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON public.reviews USING btree (is_approved) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_reviews_is_featured ON public.reviews USING btree (is_featured) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews USING btree (created_at) TABLESPACE pg_default;

-- Enable RLS on reviews table
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow reading reviews table
CREATE POLICY "Allow anon read access" ON public.reviews FOR SELECT USING (true);

-- Create RLS policy to allow admins to update reviews
CREATE POLICY "Allow admin update access" ON public.reviews FOR UPDATE USING (true);

-- Create RLS policy to allow inserting reviews
CREATE POLICY "Allow anon insert access" ON public.reviews FOR INSERT WITH CHECK (true);
