-- Create reviews table
create table public.reviews (
  id uuid not null default gen_random_uuid (),
  booking_id uuid not null,
  overall_rating integer not null check (overall_rating >= 1 and overall_rating <= 5),
  service_rating integer null check (service_rating >= 1 and service_rating <= 5),
  communication_rating integer null check (communication_rating >= 1 and communication_rating <= 5),
  punctuality_rating integer null check (punctuality_rating >= 1 and punctuality_rating <= 5),
  review_text text null,
  is_approved boolean null default false,
  is_featured boolean null default false,
  moderated_by uuid null,
  moderated_at timestamp with time zone null,
  moderation_notes text null,
  created_at timestamp with time zone null default now(),
  constraint reviews_pkey primary key (id),
  constraint reviews_booking_id_unique unique (booking_id),
  constraint reviews_booking_id_fkey foreign key (booking_id) references bookings (id) on delete cascade,
  constraint reviews_moderated_by_fkey foreign key (moderated_by) references auth.users (id)
) tablespace pg_default;

-- Create indexes for performance
create index if not exists idx_reviews_booking_id on public.reviews using btree (booking_id) tablespace pg_default;
create index if not exists idx_reviews_overall_rating on public.reviews using btree (overall_rating) tablespace pg_default;
create index if not exists idx_reviews_is_approved on public.reviews using btree (is_approved) tablespace pg_default;
create index if not exists idx_reviews_is_featured on public.reviews using btree (is_featured) tablespace pg_default;
create index if not exists idx_reviews_created_at on public.reviews using btree (created_at) tablespace pg_default;
