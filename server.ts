import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local first (if present), then .env
const envLocalPath = path.resolve(__dirname, '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}
dotenv.config();

const PORT = 3000;

// Basic in-memory rate limiting per IP address
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 8;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

// Strict sanitization against HTML / script injection
function sanitizeInput(value: unknown, maxLength = 1000): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '') // Strip control chars
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
}

function isValidPhone(phone: string): boolean {
  if (!phone) return false;
  // Allow international format (+, spaces, hyphens, parentheses) with 7 to 15 digits
  const digitsOnly = phone.replace(/\D/g, '');
  const formatRegex = /^[+\d\s\-()]{7,22}$/;
  return formatRegex.test(phone) && digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

const ALLOWED_ENQUIRY_TYPES = [
  'Room Booking',
  'Dining',
  'Banquet / Event',
  'Corporate Event',
  'General Enquiry',
];

function isSmtpConfigured(): boolean {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();
  const hotelEmail = process.env.HOTEL_EMAIL?.trim();

  if (!host || !user || !pass || !hotelEmail) {
    return false;
  }

  // Ensure default example placeholders are not treated as live credentials
  if (
    host === 'smtp.example.com' ||
    user === 'your-email@example.com' ||
    pass === 'your-password' ||
    hotelEmail === 'hotel@example.com'
  ) {
    return false;
  }

  return true;
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '32kb' }));
  app.use(express.urlencoded({ extended: true, limit: '32kb' }));

  // Health / API status endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      smtpConfigured: isSmtpConfigured(),
    });
  });

  // POST /api/contact - Secure SMTP Enquiry Endpoint
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const clientIp =
        (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
        req.socket.remoteAddress ||
        'unknown';

      // 1. Check Rate Limit
      if (!checkRateLimit(clientIp)) {
        res.status(429).json({
          success: false,
          message: 'Too many enquiries submitted recently. Please wait a few minutes and try again.',
        });
        return;
      }

      // 2. Honeypot Spam Protection
      // If hidden honeypot field is filled by an automated bot, silently succeed without sending email
      const honeypot = req.body?.website_url || req.body?.company_fax;
      if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
        res.status(200).json({
          success: true,
          message:
            'Thank you for contacting Hotel Badari Grand. Our team will get back to you shortly.',
        });
        return;
      }

      // 3. Sanitize all incoming fields
      const fullName = sanitizeInput(req.body?.fullName, 120);
      const phone = sanitizeInput(req.body?.phone, 30);
      const email = sanitizeInput(req.body?.email, 160);
      const enquiryType = sanitizeInput(req.body?.enquiryType, 80);
      const checkIn = sanitizeInput(req.body?.checkIn, 40);
      const checkOut = sanitizeInput(req.body?.checkOut, 40);
      const guests = sanitizeInput(req.body?.guests, 30);
      const roomType = sanitizeInput(req.body?.roomType, 80);
      const message = sanitizeInput(req.body?.message, 2500);

      // 4. Server-side Validation
      const errors: Record<string, string> = {};

      if (!fullName || fullName.length < 2) {
        errors.fullName = 'Please enter your full name.';
      }

      if (!phone || !isValidPhone(phone)) {
        errors.phone = 'Please enter a valid phone number (7–15 digits).';
      }

      if (email && !isValidEmail(email)) {
        errors.email = 'Please enter a valid email address.';
      }

      if (!enquiryType || !ALLOWED_ENQUIRY_TYPES.includes(enquiryType)) {
        errors.enquiryType = 'Please select a valid enquiry type.';
      }

      if (checkIn && checkOut) {
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        if (!isNaN(inDate.getTime()) && !isNaN(outDate.getTime()) && outDate < inDate) {
          errors.checkOut = 'Check-out date must be on or after the check-in date.';
        }
      }

      if (!message || message.length < 5) {
        errors.message = 'Please enter a brief message regarding your enquiry.';
      }

      if (Object.keys(errors).length > 0) {
        res.status(400).json({
          success: false,
          message: 'Please check the highlighted fields and try again.',
          errors,
        });
        return;
      }

      // 5. Check SMTP Configuration (or dry-run test transport if explicitly enabled in test env)
      const useJsonTestTransport =
        process.env.SMTP_TRANSPORT === 'json' ||
        req.headers['x-smtp-test-transport'] === 'true';

      if (!isSmtpConfigured() && !useJsonTestTransport) {
        console.error(
          '[Hotel Badari Grand SMTP] Email service is not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM, and HOTEL_EMAIL in .env.local or environment variables.'
        );
        res.status(503).json({
          success: false,
          message: 'Email service is currently unavailable. Please contact us directly.',
        });
        return;
      }

      // 6. Configure Nodemailer Transporter
      const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
      const smtpSecure = smtpPort === 465;

      const transporter = useJsonTestTransport
        ? nodemailer.createTransport({ jsonTransport: true })
        : nodemailer.createTransport({
            host: process.env.SMTP_HOST?.trim(),
            port: smtpPort,
            secure: smtpSecure,
            auth: {
              user: process.env.SMTP_USER?.trim(),
              pass: process.env.SMTP_PASSWORD?.trim(),
            },
          });

      const fromAddress =
        process.env.SMTP_FROM?.trim() ||
        process.env.SMTP_USER?.trim() ||
        'no-reply@hotelbadarigrand.com';
      const hotelEmailAddress =
        process.env.HOTEL_EMAIL?.trim() || 'hotel@hotelbadarigrand.com';

      const submittedAt = new Date().toLocaleString('en-IN', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Asia/Kolkata',
      });

      const formattedMessage = roomType
        ? `[Selected Room Placeholder: ${roomType}]\n${message}`
        : message;

      // 7. Build Hotel Notification Email (Plain Text + HTML)
      const adminSubject = 'New Enquiry – Hotel Badari Grand';

      const adminTextBody = [
        'NEW HOTEL ENQUIRY',
        '',
        'Name:',
        fullName,
        '',
        'Phone:',
        phone,
        '',
        'Email:',
        email || 'Not provided',
        '',
        'Enquiry Type:',
        enquiryType,
        '',
        'Check-in:',
        checkIn || 'Not specified',
        '',
        'Check-out:',
        checkOut || 'Not specified',
        '',
        'Guests:',
        guests || 'Not specified',
        '',
        'Message:',
        formattedMessage,
        '',
        'Submitted from:',
        'Hotel Badari Grand Website',
        '',
        'Submission Date & Time:',
        submittedAt,
      ].join('\n');

      const adminHtmlBody = `
        <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 640px; margin: 0 auto; background-color: #F8F6F1; padding: 32px; border: 1px solid #E5E0D5; color: #222222;">
          <div style="border-bottom: 2px solid #B8860B; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #B8860B; font-family: Arial, sans-serif;">
              HOTEL BADARI GRAND
            </p>
            <h1 style="margin: 6px 0 0 0; font-size: 24px; color: #111111; font-weight: normal;">
              NEW HOTEL ENQUIRY
            </h1>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px; background-color: #FFFFFF; border: 1px solid #E5E0D5;">
            <tbody>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; width: 35%; color: #111111;">Name</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #222222;">${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; color: #111111;">Phone</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #222222;">${escapeHtml(phone)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; color: #111111;">Email</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #222222;">${escapeHtml(email || 'Not provided')}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; color: #111111;">Enquiry Type</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #B8860B; font-weight: bold;">${escapeHtml(enquiryType)}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; color: #111111;">Check-in</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #222222;">${escapeHtml(checkIn || 'Not specified')}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; color: #111111;">Check-out</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #222222;">${escapeHtml(checkOut || 'Not specified')}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; color: #111111;">Guests</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #222222;">${escapeHtml(guests || 'Not specified')}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; font-weight: bold; vertical-align: top; color: #111111;">Message</td>
                <td style="padding: 12px 16px; border-bottom: 1px solid #F0ECE1; color: #222222; white-space: pre-wrap;">${escapeHtml(formattedMessage)}</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 20px; font-family: Arial, sans-serif; font-size: 12px; color: #666666;">
            <p style="margin: 0 0 4px 0;"><strong>Submitted from:</strong> Hotel Badari Grand Website</p>
            <p style="margin: 0;"><strong>Timestamp:</strong> ${escapeHtml(submittedAt)}</p>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"Hotel Badari Grand Website" <${fromAddress}>`,
        to: hotelEmailAddress,
        replyTo: email && isValidEmail(email) ? email : undefined,
        subject: adminSubject,
        text: adminTextBody,
        html: adminHtmlBody,
      });

      // 8. Optional Customer Confirmation Email (only if valid email address is provided)
      if (email && isValidEmail(email)) {
        const customerSubject = 'Thank You for Contacting Hotel Badari Grand';
        const customerTextBody = [
          `Dear ${fullName},`,
          '',
          'Thank you for contacting Hotel Badari Grand.',
          '',
          'We have received your enquiry and our team will get back to you shortly.',
          '',
          'We look forward to welcoming you.',
          '',
          'Warm regards,',
          'Hotel Badari Grand',
        ].join('\n');

        const customerHtmlBody = `
          <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #F8F6F1; padding: 32px; border: 1px solid #E5E0D5; color: #222222;">
            <div style="border-bottom: 2px solid #B8860B; padding-bottom: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: #B8860B; font-family: Arial, sans-serif;">
                HOTEL BADARI GRAND
              </p>
            </div>
            <p style="font-size: 16px; line-height: 1.6; color: #111111;">Dear ${escapeHtml(fullName)},</p>
            <p style="font-size: 16px; line-height: 1.6; color: #222222;">Thank you for contacting Hotel Badari Grand.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #222222;">We have received your enquiry and our team will get back to you shortly.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #222222;">We look forward to welcoming you.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #111111; margin-top: 28px;">
              Warm regards,<br />
              <strong>Hotel Badari Grand</strong>
            </p>
          </div>
        `;

        try {
          await transporter.sendMail({
            from: `"Hotel Badari Grand" <${fromAddress}>`,
            to: email,
            subject: customerSubject,
            text: customerTextBody,
            html: customerHtmlBody,
          });
        } catch (confirmError) {
          // Log confirmation email issue on server without failing the primary enquiry submission
          console.error('[Hotel Badari Grand SMTP] Failed to send customer confirmation email:', confirmError);
        }
      }

      res.status(200).json({
        success: true,
        message:
          'Thank you for contacting Hotel Badari Grand. Our team will get back to you shortly.',
      });
    } catch (error) {
      // Log technical details strictly on the server; never expose credentials or stack traces to visitor
      console.error('[Hotel Badari Grand SMTP] Error sending enquiry email:', error);
      res.status(503).json({
        success: false,
        message: 'Email service is currently unavailable. Please contact us directly.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Hotel Badari Grand server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
