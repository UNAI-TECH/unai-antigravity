
-- 1. Create the 'resumes' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true)
on conflict (id) do nothing;

-- 2. Enable RLS on storage.objects (Skipped to avoid permission errors - typically enabled by default)
-- alter table storage.objects enable row level security;

-- 3. Storage Policies for 'resumes' bucket

-- Allow public access to read files (so Admins can download them)
drop policy if exists "Public Access Resumes" on storage.objects;
create policy "Public Access Resumes"
on storage.objects for select
using ( bucket_id = 'resumes' );

-- Allow public (anon) upload to the bucket (so Applicants can upload)
drop policy if exists "Public Upload Resumes" on storage.objects;
create policy "Public Upload Resumes"
on storage.objects for insert
with check ( bucket_id = 'resumes' );

-- 4. Create job_applications table if it doesn't exist
create table if not exists public.job_applications (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    job_id uuid not null, -- references jobs(id)
    applicant_name text not null,
    email text not null,
    phone text not null,
    resume_url text,
    answers jsonb,
    status text default 'pending'
);

-- 5. Enable RLS on job_applications
alter table public.job_applications enable row level security;

-- 6. Table Policies for 'job_applications'

-- Allow public (anon) to INSERT applications
drop policy if exists "Public Insert Applications" on public.job_applications;
drop policy if exists "Public can submit applications" on public.job_applications;
create policy "Public Insert Applications"
on public.job_applications for insert
with check ( true );

-- Allow public (anon) to SELECT applications (Required for the Admin Dashboard to read them, since Admin is client-side auth only)
drop policy if exists "Public Select Applications" on public.job_applications;
drop policy if exists "Authenticated users can view applications" on public.job_applications;
create policy "Public Select Applications"
on public.job_applications for select
using ( true );

-- Allow public to UPDATE applications (For Admin to change status)
drop policy if exists "Public Update Applications" on public.job_applications;
drop policy if exists "Authenticated users can update applications" on public.job_applications;
create policy "Public Update Applications"
on public.job_applications for update
using ( true );
