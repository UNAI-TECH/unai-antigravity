// Email Service using EmailJS (works from browser!)
import emailjs from '@emailjs/browser';

// EmailJS Configuration
// Get these from https://dashboard.emailjs.com/
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_eexv4sc';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ejx25pt';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'mRO7xztHQePJQ53pI';

// Initialize EmailJS
if (EMAILJS_PUBLIC_KEY) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

export const sendStatusEmail = async (
    toEmail: string,
    toName: string,
    status: 'received' | 'approved' | 'rejected',
    jobTitle: string
) => {
    if (!toEmail || !toEmail.trim()) {
        console.warn('⚠️ No recipient email address provided. Skipping email dispatch.');
        return false;
    }

    const cleanEmail = toEmail.trim();
    const cleanName = (toName || 'Applicant').trim();
    const cleanJobTitle = (jobTitle || 'Position').trim();

    let subject = '';
    let message = '';

    switch (status) {
        case 'received':
            subject = `Application Received: ${cleanJobTitle} - UNAI Technology`;
            message = `Dear ${cleanName},\n\nThank you for applying for the ${cleanJobTitle} position at UNAI Technology.\n\nWe have successfully received your application. Our recruitment team is currently reviewing your profile and qualifications.\n\nIf your experience matches our current requirements, we will reach out to you with information regarding the next steps.\n\nWarm regards,\nRecruitment Team\nUNAI Technology\ncontact@unaitech.com`;
            break;
        case 'approved':
            subject = `Application Update: Next Steps for ${cleanJobTitle} - UNAI Technology`;
            message = `Dear ${cleanName},\n\nThank you for taking the time to apply for the ${cleanJobTitle} position at UNAI Technology.\n\nWe are pleased to inform you that your application has been shortlisted and approved for the next stage of our selection process.\n\nA member of our team will be in touch with you shortly with details regarding the interview schedule.\n\nWe look forward to speaking with you.\n\nWarm regards,\nRecruitment Team\nUNAI Technology\ncontact@unaitech.com`;
            break;
        case 'rejected':
            subject = `Update on your application for ${cleanJobTitle} - UNAI Technology`;
            message = `Dear ${cleanName},\n\nThank you for your interest in UNAI Technology and for applying for the ${cleanJobTitle} position.\n\nAfter careful consideration of all applications, we have decided to move forward with other candidates whose qualifications more closely align with our current needs.\n\nWe sincerely appreciate the time and effort you took to apply and wish you the best in your professional endeavors.\n\nSincerely,\nRecruitment Team\nUNAI Technology\ncontact@unaitech.com`;
            break;
    }

    try {
        // Comprehensive parameter aliases to satisfy whatever variable names the EmailJS template uses:
        // 'email' is required by template_ejx25pt ('The recipients address is empty' occurs if missing)
        const templateParams = {
            // Recipient email aliases
            email: cleanEmail,
            to_email: cleanEmail,
            user_email: cleanEmail,
            recipient_email: cleanEmail,
            to: cleanEmail,

            // Recipient name aliases
            name: cleanName,
            user_name: cleanName,
            to_name: cleanName,
            applicant_name: cleanName,

            // Position & Status aliases
            job_title: cleanJobTitle,
            position: cleanJobTitle,
            title: cleanJobTitle,
            status: status,

            // Sender, subject & message aliases
            from_name: 'UNAI Technology',
            company_name: 'UNAI Technology',
            reply_to: 'unai.technology@gmail.com',
            subject: subject,
            email_subject: subject,
            message: message,
            content: message,
            body: message
        };

        console.log('Sending email with params:', { toEmail: cleanEmail, toName: cleanName, status, jobTitle: cleanJobTitle });

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        console.log('✅ Email sent successfully!', response);
        return true;
    } catch (error: any) {
        console.error('❌ Failed to send email:', error);
        console.error('Error details:', error?.text || error?.message || error);
        throw error;
    }
};
