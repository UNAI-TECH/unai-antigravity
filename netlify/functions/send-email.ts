import type { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';

export const handler: Handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { toEmail, toName, status, jobTitle } = JSON.parse(event.body || '{}');

        // Validate input
        if (!toEmail || !toName || !status || !jobTitle) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Missing required fields' }),
            };
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Determine email content
        let subject = '';
        let htmlContent = '';

        switch (status) {
            case 'received':
                subject = 'Application Received - UNAI Antigravity';
                htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #6366f1;">Application Received ✅</h2>
            <p>Dear ${toName},</p>
            <p>Thank you for applying for the <strong>${jobTitle}</strong> position at UNAI Antigravity.</p>
            <p>We have received your application and it is currently being processed by our team. We will review your qualifications and get back to you shortly.</p>
            <p>Best regards,<br><strong>UNAI Team</strong></p>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">This email was sent from nobitawellboy@gmail.com</p>
          </div>
        `;
                break;
            case 'approved':
                subject = '🎉 Congratulations! Application Approved - UNAI Antigravity';
                htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #10b981;">Application Approved! 🎉</h2>
            <p>Dear ${toName},</p>
            <p>We are pleased to inform you that your application for the <strong>${jobTitle}</strong> position has been <strong style="color: #10b981;">APPROVED</strong>!</p>
            <p>Our team will contact you shortly with the next steps regarding the interview process.</p>
            <p>Congratulations and we look forward to speaking with you soon!</p>
            <p>Best regards,<br><strong>UNAI Team</strong></p>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">This email was sent from nobitawellboy@gmail.com</p>
          </div>
        `;
                break;
            case 'rejected':
                subject = 'Application Status Update - UNAI Antigravity';
                htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #6366f1;">Application Status Update</h2>
            <p>Dear ${toName},</p>
            <p>Thank you for your interest in the <strong>${jobTitle}</strong> position at UNAI Antigravity.</p>
            <p>After careful review, we regret to inform you that we will not be moving forward with your application at this time.</p>
            <p>We appreciate your time and effort in applying, and we wish you the best in your future endeavors.</p>
            <p>Best regards,<br><strong>UNAI Team</strong></p>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">This email was sent from nobitawellboy@gmail.com</p>
          </div>
        `;
                break;
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid status' }),
                };
        }

        // Send email
        const info = await transporter.sendMail({
            from: `"UNAI Antigravity" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: subject,
            html: htmlContent,
            replyTo: 'nobitawellboy@gmail.com',
        });

        console.log('Email sent:', info.messageId);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                messageId: info.messageId
            }),
        };

    } catch (error) {
        console.error('Email error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send email',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
        };
    }
};
