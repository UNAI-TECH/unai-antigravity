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
            subject = 'Application Received - UNAI Antigravity';
            message = `Dear ${cleanName},\n\nThank you for applying for the ${cleanJobTitle} position at UNAI Antigravity.\n\nWe have received your application and it is currently being processed by our team. We will review your qualifications and get back to you shortly.\n\nBest regards,\nUNAI Team\n\n---\nThis email was sent from unai.technology@gmail.com`;
            break;
        case 'approved':
            subject = '🎉 Congratulations! Application Approved';
            message = `Dear ${cleanName},\n\nWe are pleased to inform you that your application for the ${cleanJobTitle} position has been APPROVED!\n\nOur team will contact you shortly with the next steps regarding the interview process.\n\nCongratulations!\n\nBest regards,\nUNAI Team\n\n---\nThis email was sent from unai.technology@gmail.com`;
            break;
        case 'rejected':
            subject = 'Application Status Update';
            message = `Dear ${cleanName},\n\nThank you for your interest in the ${cleanJobTitle} position at UNAI Antigravity.\n\nAfter careful review, we regret to inform you that we will not be moving forward with your application at this time. We appreciate your time and wish you the best in your future endeavors.\n\nBest regards,\nUNAI Team\n\n---\nThis email was sent from unai.technology@gmail.com`;
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

            // Sender & message
            from_name: 'UNAI TECH Team',
            reply_to: 'unai.technology@gmail.com',
            subject: subject,
            message: message
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
