
-- Update Events Table schema to include banner and registration link
alter table public.events 
add column if not exists banner text,
add column if not exists registration_link text;

-- Create Storage Bucket for Event Banners
-- Note: This requires enabling Storage in Supabase Dashboard and creating a bucket named 'event-banners'
-- We can set up policies for it via SQL if the extension is enabled, but typically this is done in dashboard.
-- Here is the SQL to create policies IF the bucket exists:

-- Allow public read access to event-banners
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'event-banners' );

-- Allow authenticated upload access to event-banners (for admin)
create policy "Authenticated Upload"
on storage.objects for insert
with check ( bucket_id = 'event-banners' );
