import nodemailer from 'nodemailer';
import logger from '../config/logger.js';

let transporter = null;

async function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: { user, pass },
    });
    logger.info('Nodemailer configured with SMTP host: ' + host);
  } else {
    // Development/Ethereal or mock fallback
    logger.info('SMTP credentials not provided; using development test transporter.');
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch {
      transporter = {
        sendMail: async (options) => {
          logger.info(`[MOCK EMAIL SENT] To: ${options.to} | Subject: ${options.subject}`);
          return { messageId: 'mock-' + Date.now() };
        },
      };
    }
  }

  return transporter;
}

export async function sendContactNotification(enquiry) {
  try {
    const mailer = await getTransporter();
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@abrroadlines.com';

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"ABR Roadlines Portal" <info@abrroadlines.com>',
      to: adminEmail,
      replyTo: enquiry.email,
      subject: `🚨 New Freight Enquiry from ${enquiry.name} (${enquiry.serviceType})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0B192C; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; color: #FF6500;">ABR ROADLINES PVT. LTD.</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #cbd5e1;">New Freight & Commercial Transport Lead</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Client Name:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${enquiry.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="tel:${enquiry.phone}">${enquiry.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${enquiry.email}">${enquiry.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Requested Service:</strong></td>
                <td style="padding: 8px 0; color: #FF6500; font-weight: bold;">${enquiry.serviceType}</td>
              </tr>
            </table>

            <div style="margin-top: 16px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #FF6500; border-radius: 4px;">
              <strong style="color: #0B192C; font-size: 13px;">Message / Consignment Details:</strong>
              <p style="margin: 8px 0 0 0; color: #334155; line-height: 1.5; font-size: 14px;">${enquiry.message}</p>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #64748b;">
            ABR Roadlines Pvt. Ltd. • NH-1 Ambala Cantt, Haryana • +91-93150 01977
          </div>
        </div>
      `,
    };

    const info = await mailer.sendMail(mailOptions);
    logger.info(`Contact email notification dispatched successfully: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Failed to send contact notification email:', error);
  }
}

export async function sendQuoteNotification(quote) {
  try {
    const mailer = await getTransporter();
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'info@abrroadlines.com';

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"ABR Roadlines Portal" <info@abrroadlines.com>',
      to: adminEmail,
      replyTo: quote.email,
      subject: `🚛 Freight Quote Request [${quote.referenceId}]: ${quote.pickupCity} ➔ ${quote.dropCity}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background-color: #0B192C; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; color: #FF6500;">ABR ROADLINES PVT. LTD.</h2>
            <p style="margin: 5px 0 0 0; font-size: 13px; color: #cbd5e1;">Freight Rate Quote Request • Ref: ${quote.referenceId}</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; width: 140px;"><strong>Client:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-weight: bold;">${quote.fullName} (${quote.companyName || 'Individual'})</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Contact:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${quote.phone} | ${quote.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Corridor Route:</strong></td>
                <td style="padding: 8px 0; color: #FF6500; font-weight: bold; font-size: 15px;">${quote.pickupCity} ➔ ${quote.dropCity}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Vehicle Type:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${quote.vehicleType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;"><strong>Cargo / Weight:</strong></td>
                <td style="padding: 8px 0; color: #0f172a;">${quote.loadType} (${quote.weightMetricTons} MT)</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 11px; color: #64748b;">
            ABR Roadlines Pvt. Ltd. Dispatch Control
          </div>
        </div>
      `,
    };

    const info = await mailer.sendMail(mailOptions);
    logger.info(`Quote email notification dispatched: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error('Failed to send quote notification email:', error);
  }
}

