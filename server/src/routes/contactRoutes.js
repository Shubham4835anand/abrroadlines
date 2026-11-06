import express from 'express';
import { z } from 'zod';
import { submitContact, getAllContactEnquiries } from '../controllers/contactController.js';
import { validateBody } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { formLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const contactValidationSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Valid email address is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  message: z.string().min(10, 'Message must have at least 10 characters'),
});

router.post('/', formLimiter, validateBody(contactValidationSchema), submitContact);
router.get('/', requireAuth, getAllContactEnquiries);

export default router;

