-- Enable the pg_net extension to allow making HTTP requests from the database
create extension if not exists pg_net;

-- Create a function to send emails via Resend (or any other API)
create or replace function public.handle_job_application_email()
returns trigger as $$
declare
    job_title text;
    email_subject text;
    email_body text;
    -- REPLACE THIS WITH YOUR ACTUAL RESEND API KEY
    -- Get one for free at https://resend.com
    resend_api_key text := 're_eccQtPPo_92WCpMU5bA8AvzXjj786BQgU'; 
    sender_email text := 'onboarding@resend.dev'; -- Verfied sender in Resend
    to_email text;
    applicant_name text;
    
begin
    -- 1. Fetch Job Title (Since job_id is Foreign Key)
    select title into job_title from public.jobs where id = new.job_id;
    
    -- Set common variables
    to_email := new.email;
    applicant_name := new.applicant_name;

    -- 2. Determine Email Content based on Event
    if (TG_OP = 'INSERT') then
        -- New Application Received
        email_subject := 'Application Received - UNAI Antigravity';
        email_body := '<p>Dear ' || applicant_name || ',</p>' ||
                      '<p>Thank you for applying for the <strong>' || job_title || '</strong> position at UNAI Antigravity.</p>' ||
                      '<p>We have received your application and it is currently being processed by our team.</p>' ||
                      '<p>Best regards,<br>UNAI Team</p>';
                      
    elsif (TG_OP = 'UPDATE' and old.status <> new.status) then
        -- Status Changed
        if (new.status = 'approved') then
            email_subject := 'Congratulations! Application Approved - UNAI Antigravity';
            email_body := '<p>Dear ' || applicant_name || ',</p>' ||
                          '<p>We are pleased to inform you that your application for the <strong>' || job_title || '</strong> position has been <strong>APPROVED</strong>!</p>' ||
                          '<p>Our team will contact you shortly with the next steps.</p>' ||
                          '<p>Best regards,<br>UNAI Team</p>';
                          
        elsif (new.status = 'rejected') then
            email_subject := 'Application Status Update - UNAI Antigravity';
            email_body := '<p>Dear ' || applicant_name || ',</p>' ||
                          '<p>Thank you for your interest in the <strong>' || job_title || '</strong> position.</p>' ||
                          '<p>After careful review, we regret to inform you that we will not be moving forward with your application at this time.</p>' ||
                          '<p>Best regards,<br>UNAI Team</p>';
        else
            -- Unknown status or pending -> approved -> pending? Ignore.
            return new;
        end if;
    else
        return new;
    end if;

    -- 3. Send HTTP Request to Resend API
    -- Note: This happens asynchronously in the background
    perform net.http_post(
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
    );

    return new;
end;
$$ language plpgsql security definer;

-- Create the Trigger
drop trigger if exists on_job_application_change on public.job_applications;

create trigger on_job_application_change
after insert or update of status on public.job_applications
for each row
execute function public.handle_job_application_email();
