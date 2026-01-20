-- 1. Create a debug log table to see if the trigger is firing
create table if not exists public.email_debug_logs (
    id uuid default gen_random_uuid() primary key,
    created_at timestamptz default now(),
    event_type text,
    status text,
    recipient text,
    error_message text,
    request_id bigint
);

-- 2. Update the function to log steps
create or replace function public.handle_job_application_email()
returns trigger as $$
declare
    job_title text;
    email_subject text;
    email_body text;
    -- YOUR API KEY
    resend_api_key text := 're_eccQtPPo_92WCpMU5bA8AvzXjj786BQgU'; 
    sender_email text := 'onboarding@resend.dev';
    to_email text;
    applicant_name text;
    new_request_id bigint;
begin
    -- DEBUG: Log Start
    insert into public.email_debug_logs (event_type, status, recipient)
    values (TG_OP, 'STARTED', new.email);

    -- 1. Fetch Job Title
    select title into job_title from public.jobs where id = new.job_id;
    
    to_email := new.email;
    applicant_name := new.applicant_name;

    -- 2. Determine Content
    if (TG_OP = 'INSERT') then
        email_subject := 'Application Received - UNAI Antigravity';
        email_body := '<p>Dear ' || applicant_name || ',</p><p>Thank you for applying for the <strong>' || job_title || '</strong> position.</p>';
        
    elsif (TG_OP = 'UPDATE' and old.status <> new.status) then
        if (new.status = 'approved') then
            email_subject := 'Approved - UNAI Antigravity';
            email_body := '<p>Dear ' || applicant_name || ',</p><p>Your application for <strong>' || job_title || '</strong> has been APPROVED!</p>';
        elsif (new.status = 'rejected') then
            email_subject := 'Status Update - UNAI Antigravity';
            email_body := '<p>Dear ' || applicant_name || ',</p><p>Update regarding your application for <strong>' || job_title || '</strong>.</p>';
        else
            return new;
        end if;
    else
        return new;
    end if;

    -- DEBUG: Pre-Send
    insert into public.email_debug_logs (event_type, status, recipient, error_message)
    values (TG_OP, 'PRE_SEND', to_email, 'Subject: ' || email_subject);

    -- 3. Send HTTP Request
    select net.http_post(
        url := 'https://api.resend.com/emails',
        headers := jsonb_build_object(
            'Authorization', 'Bearer ' || resend_api_key,
            'Content-Type', 'application/json'
        ),
        body := jsonb_build_object(
            'from', sender_email,
            'to', to_email,
            'subject', email_subject,
            'html', email_body,
            'reply_to', 'nobitawellboy@gmail.com'
        )
    ) into new_request_id;

    -- DEBUG: Sent
    insert into public.email_debug_logs (event_type, status, recipient, request_id)
    values (TG_OP, 'SENT_REQUEST', to_email, new_request_id);

    return new;

exception when others then
    -- DEBUG: Error
    insert into public.email_debug_logs (event_type, status, recipient, error_message)
    values (TG_OP, 'ERROR', new.email, SQLERRM);
    return new;
end;
$$ language plpgsql security definer;

-- 3. Check if pg_net is actually working
-- You can view logs by running: SELECT * FROM public.email_debug_logs ORDER BY created_at DESC;
