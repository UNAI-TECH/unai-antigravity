-- =========================================================
-- Supabase Setup Script for Internships Table
-- Run this in your Supabase SQL Editor if you wish to maintain
-- a dedicated 'internships' table.
-- =========================================================

-- 1. Create 'internships' table
CREATE TABLE IF NOT EXISTS public.internships (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    role text NOT NULL,
    duration text NOT NULL,
    description text NOT NULL,
    skills text[] DEFAULT '{}'::text[],
    icon text DEFAULT 'Cpu',
    location text DEFAULT 'Chennai / Remote',
    stipend text DEFAULT 'Stipend Based',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;

-- 3. Row Level Security Policies
-- READ
DROP POLICY IF EXISTS "Public Select Internships" ON public.internships;
CREATE POLICY "Public Select Internships"
ON public.internships FOR SELECT
USING (true);

-- INSERT
DROP POLICY IF EXISTS "Public Insert Internships" ON public.internships;
CREATE POLICY "Public Insert Internships"
ON public.internships FOR INSERT
WITH CHECK (true);

-- UPDATE
DROP POLICY IF EXISTS "Public Update Internships" ON public.internships;
CREATE POLICY "Public Update Internships"
ON public.internships FOR UPDATE
USING (true);

-- DELETE
DROP POLICY IF EXISTS "Public Delete Internships" ON public.internships;
CREATE POLICY "Public Delete Internships"
ON public.internships FOR DELETE
USING (true);
