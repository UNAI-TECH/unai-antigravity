-- Update Events Table schema to include all new fields
alter table public.events 
add column if not exists caption text,
add column if not exists posters text[];

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
