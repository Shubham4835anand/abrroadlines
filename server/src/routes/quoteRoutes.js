import express from 'express';
import { z } from 'zod';
import { submitQuote, getAllQuotes } from '../controllers/quoteController.js';
import { validateBody } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import { formLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const quoteValidationSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Valid business email is required'),
  companyName: z.string().optional(),
  pickupCity: z.string().min(2, 'Pickup city is required'),
  dropCity: z.string().min(2, 'Drop city is required'),
  vehicleType: z.string().min(1, 'Vehicle type is required'),
  loadType: z.string().min(1, 'Load type is required'),
  weightMetricTons: z.string().min(1, 'Weight is required'),
  pickupDate: z.string().optional(),
  additionalNotes: z.string().optional(),
});

router.post('/', formLimiter, validateBody(quoteValidationSchema), submitQuote);
router.get('/', requireAuth, getAllQuotes);

export default router;

