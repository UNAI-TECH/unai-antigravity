# Supabase Setup

To use Supabase with this project, you need to create a project on [Supabase](https://supabase.com/) and set the environment variables in `.env` (copy from `.env.example`).

## Database Schema

Run the following SQL in your Supabase SQL Editor to create the necessary tables and Row Level Security (RLS) policies.

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Events Table
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  date text not null,
  location text not null,
  type text not null,
  description text not null,
  attendees text not null,
  status text check (status in ('upcoming', 'past')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Jobs Table
create table public.jobs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  department text not null,
  location text not null,
  type text not null,
  salary text not null,
  description text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Team Members Table
create table public.team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  bio text not null,
  social jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Gallery Items Table
create table public.gallery_items (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null,
  color text check (color in ('blue', 'purple')) not null,
  caption text,
  description text,
  highlights text[],
  photos text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.events enable row level security;
alter table public.jobs enable row level security;
alter table public.team_members enable row level security;
alter table public.gallery_items enable row level security;

-- Create Policies (Public Read, Authenticated Write)
-- Note: For simplicity in this demo, we are allowing anonymous write. 
-- In production, you should restrict write access to authenticated admin users.

-- Events
create policy "Public events are viewable by everyone." on public.events
  for select using (true);

create policy "Events are insertable by everyone." on public.events
  for insert with check (true);

create policy "Events are deletable by everyone." on public.events
  for delete using (true);

-- Jobs
create policy "Public jobs are viewable by everyone." on public.jobs
  for select using (true);

create policy "Jobs are insertable by everyone." on public.jobs
  for insert with check (true);

create policy "Jobs are deletable by everyone." on public.jobs
  for delete using (true);

-- Team Members
create policy "Public team members are viewable by everyone." on public.team_members
  for select using (true);

create policy "Team members are insertable by everyone." on public.team_members
  for insert with check (true);

create policy "Team members are deletable by everyone." on public.team_members
  for delete using (true);

-- Gallery Items
create policy "Public gallery items are viewable by everyone." on public.gallery_items
  for select using (true);

create policy "Gallery items are insertable by everyone." on public.gallery_items
  for insert with check (true);

create policy "Gallery items are deletable by everyone." on public.gallery_items
  for delete using (true);
```
