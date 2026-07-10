-- 1. Add registration_type and form_fields to events table
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS registration_type text DEFAULT 'url',
ADD COLUMN IF NOT EXISTS form_fields jsonb DEFAULT '[]'::jsonb;

-- 2. Create event_registrations table
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id uuid REFERENCES public.events(id) ON DELETE CASCADE,
    applicant_name text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    answers jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS on event_registrations
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- 4. Add RLS Policies for event_registrations
-- Allow anyone to insert a registration
CREATE POLICY "Enable insert for anyone" ON public.event_registrations
    FOR INSERT WITH CHECK (true);

-- Allow public read access to registrations (or restrict to authenticated users if needed)
CREATE POLICY "Enable read access for all users" ON public.event_registrations
    FOR SELECT USING (true);
