-- Update Events Table schema to include all new fields
alter table public.events 
add column if not exists caption text,
add column if not exists posters text[],
add column if not exists max_registrations integer;

-- Enable RLS and add public policies so edits and registrations persist reliably
alter table public.events enable row level security;

drop policy if exists "Public Select Events" on public.events;
create policy "Public Select Events" on public.events for select using (true);

drop policy if exists "Public Insert Events" on public.events;
create policy "Public Insert Events" on public.events for insert with check (true);

drop policy if exists "Public Update Events" on public.events;
create policy "Public Update Events" on public.events for update using (true);

drop policy if exists "Public Delete Events" on public.events;
create policy "Public Delete Events" on public.events for delete using (true);

-- Update the type column to allow specific event types
-- Note: You can add more types as needed

-- Create Storage Bucket for Event Posters
-- This should be done via Supabase Dashboard UI, but here's the SQL for reference
insert into storage.buckets (id, name, public)
values ('event-posters', 'event-posters', true)
on conflict (id) do nothing;

-- Storage Policies for event-posters bucket
drop policy if exists "Public Access Posters" on storage.objects;
drop policy if exists "Public Upload Posters" on storage.objects;
drop policy if exists "Public Update Posters" on storage.objects;

-- READ POLICY: Allow everyone to view poster images
create policy "Public Access Posters"
on storage.objects for select
using ( bucket_id = 'event-posters' );

-- WRITE POLICY: Allow ANYONE to upload posters
create policy "Public Upload Posters"
on storage.objects for insert
with check ( bucket_id = 'event-posters' );

-- UPDATE POLICY: Allow updates
create policy "Public Update Posters"
on storage.objects for update
using ( bucket_id = 'event-posters' );
