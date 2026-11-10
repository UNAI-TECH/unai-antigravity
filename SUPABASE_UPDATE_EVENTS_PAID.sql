-- Add paid event columns to public.events
ALTER TABLE public.events 
ADD COLUMN IF NOT EXISTS is_paid boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS amount numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS payment_button_id text DEFAULT 'pl_TxxlM2Z9Q4JvBr';

-- Also add payment tracking columns to event_registrations
ALTER TABLE public.event_registrations
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'free',
ADD COLUMN IF NOT EXISTS payment_id text,
ADD COLUMN IF NOT EXISTS amount_paid numeric DEFAULT 0;

-- Index for payment lookup and audit queries
CREATE INDEX IF NOT EXISTS idx_event_reg_payment ON public.event_registrations(event_id, payment_status, payment_id);


