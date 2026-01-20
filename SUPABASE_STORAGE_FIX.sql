
-- 1. Create the bucket if it doesn't exist (this usually needs to be done in UI, but we can try to insert into storage.buckets if permissions allow)
insert into storage.buckets (id, name, public)
values ('event-banners', 'event-banners', true)
on conflict (id) do nothing;

-- 2. ENABLE RLS on objects (it should be on by default, but good to ensure)
alter table storage.objects enable row level security;

-- 3. DROP existing policies if any to avoid conflicts
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated Upload" on storage.objects;
drop policy if exists "Public Upload" on storage.objects;

-- 4. READ POLICY: Allow everyone to view images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'event-banners' );

-- 5. WRITE POLICY: Allow ANYONE (including anonymous) to upload to this bucket
-- Since your app uses custom local auth, Supabase sees you as 'anon'.
create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'event-banners' );

-- 6. UPDATE POLICY: Allow updates just in case
create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'event-banners' );
