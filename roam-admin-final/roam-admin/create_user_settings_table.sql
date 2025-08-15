-- Create user_settings table for storing user preferences
create table public.user_settings (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  theme text null default 'system'::text,
  language text null default 'en'::text,
  timezone text null default 'UTC'::text,
  email_notifications boolean null default true,
  push_notifications boolean null default true,
  sound_enabled boolean null default true,
  auto_logout_minutes integer null default 60,
  date_format text null default 'MM/DD/YYYY'::text,
  time_format text null default '12h'::text,
  items_per_page integer null default 25,
  sidebar_collapsed boolean null default false,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint user_settings_pkey primary key (id),
  constraint user_settings_user_id_key unique (user_id),
  constraint user_settings_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint user_settings_theme_check check (
    (
      theme = any (
        array['light'::text, 'dark'::text, 'system'::text]
      )
    )
  ),
  constraint user_settings_time_format_check check (
    (
      time_format = any (array['12h'::text, '24h'::text])
    )
  )
) TABLESPACE pg_default;

-- Create index for user_id lookups
create index IF not exists idx_user_settings_user_id on public.user_settings using btree (user_id) TABLESPACE pg_default;

-- Enable Row Level Security
alter table public.user_settings enable row level security;

-- Create RLS policies
create policy "Users can view their own settings" on public.user_settings
  for select using (auth.uid() = user_id);

create policy "Users can insert their own settings" on public.user_settings
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own settings" on public.user_settings
  for update using (auth.uid() = user_id);

create policy "Users can delete their own settings" on public.user_settings
  for delete using (auth.uid() = user_id);

-- Create function to automatically update updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create trigger for updated_at
create trigger handle_user_settings_updated_at
  before update on public.user_settings
  for each row
  execute function public.handle_updated_at();
