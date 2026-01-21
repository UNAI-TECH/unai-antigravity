
-- 1. Create or Update 'gallery_items' table
create table if not exists public.gallery_items (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    title text not null,
    category text not null,
    color text default 'blue',
    caption text,
    description text,
    highlights text[],
    photos text[],
    banner text
);

-- Safely add 'banner' column if it was missing (for existing tables)
do $$
begin
    if not exists (select 1 from information_schema.columns where table_name = 'gallery_items' and column_name = 'banner') then
        alter table public.gallery_items add column banner text;
    end if;
end $$;

-- 2. Enable RLS
alter table public.gallery_items enable row level security;

-- 3. Table Policies (Allow Public access for simplified admin without backend auth)

-- READ
drop policy if exists "Public Select Gallery" on public.gallery_items;
create policy "Public Select Gallery"
on public.gallery_items for select
using ( true );

-- INSERT
drop policy if exists "Public Insert Gallery" on public.gallery_items;
create policy "Public Insert Gallery"
on public.gallery_items for insert
with check ( true );

-- UPDATE
drop policy if exists "Public Update Gallery" on public.gallery_items;
create policy "Public Update Gallery"
on public.gallery_items for update
using ( true );

-- DELETE
drop policy if exists "Public Delete Gallery" on public.gallery_items;
create policy "Public Delete Gallery"
on public.gallery_items for delete
using ( true );


-- 4. Storage Buckets Setup

-- 'event-banners' bucket
insert into storage.buckets (id, name, public)
values ('event-banners', 'event-banners', true)
on conflict (id) do nothing;

-- 'event-posters' bucket
insert into storage.buckets (id, name, public)
values ('event-posters', 'event-posters', true)
on conflict (id) do nothing;


-- 5. Storage Policies

-- Policies for 'event-banners'
drop policy if exists "Public Access Banners" on storage.objects;
create policy "Public Access Banners"
on storage.objects for select
using ( bucket_id = 'event-banners' );

drop policy if exists "Public Upload Banners" on storage.objects;
create policy "Public Upload Banners"
on storage.objects for insert
with check ( bucket_id = 'event-banners' );

drop policy if exists "Public Delete Banners" on storage.objects;
create policy "Public Delete Banners"
on storage.objects for delete
using ( bucket_id = 'event-banners' );

-- Policies for 'event-posters'
drop policy if exists "Public Access Posters" on storage.objects;
create policy "Public Access Posters"
on storage.objects for select
using ( bucket_id = 'event-posters' );

drop policy if exists "Public Upload Posters" on storage.objects;
create policy "Public Upload Posters"
on storage.objects for insert
with check ( bucket_id = 'event-posters' );

drop policy if exists "Public Delete Posters" on storage.objects;
create policy "Public Delete Posters"
on storage.objects for delete
using ( bucket_id = 'event-posters' );
