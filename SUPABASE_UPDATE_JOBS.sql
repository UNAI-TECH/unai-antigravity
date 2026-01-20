-- Add new columns to jobs table
ALTER TABLE public.jobs 
ADD COLUMN IF NOT EXISTS experience text,
ADD COLUMN IF NOT EXISTS questions jsonb DEFAULT '[]'::jsonb;

-- Create job_applications table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text,
  resume_url text,
  answers jsonb,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Policies for job_applications
CREATE POLICY "Public can submit applications" 
ON public.job_applications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Authenticated users can view applications"
ON public.job_applications FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update applications"
ON public.job_applications FOR UPDATE
TO authenticated
USING (true);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resumes
CREATE POLICY "Public Access Resumes"
ON storage.objects FOR SELECT
USING ( bucket_id = 'resumes' );

CREATE POLICY "Public Upload Resumes"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'resumes' );
