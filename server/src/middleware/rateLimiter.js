import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX) || 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

export const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 form submissions per 15 minutes per IP
  message: {
    success: false,
    message: 'Form submission limit reached. Please wait before submitting again.',
  },
});

