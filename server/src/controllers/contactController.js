import ContactEnquiry from '../models/ContactEnquiry.js';
import { sendContactNotification } from '../services/emailService.js';
import { isDbConnected } from '../config/db.js';
import logger from '../config/logger.js';

// In-memory fallback if DB is disconnected
const inMemoryEnquiries = [];

export async function submitContact(req, res, next) {
  try {
    const { name, phone, email, serviceType, message } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    let savedEnquiry = null;

    if (isDbConnected()) {
      savedEnquiry = await ContactEnquiry.create({
        name,
        phone,
        email,
        serviceType,
        message,
        ipAddress,
        userAgent,
      });
    } else {
      savedEnquiry = {
        _id: 'enq-' + Date.now(),
        name,
        phone,
        email,
        serviceType,
        message,
        createdAt: new Date().toISOString(),
      };
      inMemoryEnquiries.unshift(savedEnquiry);
    }

    // Fire email notification asynchronously
    sendContactNotification(savedEnquiry).catch((err) => {
      logger.error('Background contact email notification failed:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully. Our operations desk will get in touch.',
      data: savedEnquiry,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllContactEnquiries(req, res, next) {
  try {
    if (isDbConnected()) {
      const enquiries = await ContactEnquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: enquiries.length, data: enquiries });
    }
    return res.json({ success: true, count: inMemoryEnquiries.length, data: inMemoryEnquiries });
  } catch (error) {
    next(error);
  }
}

