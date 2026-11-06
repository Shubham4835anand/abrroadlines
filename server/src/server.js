import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import logger from './config/logger.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Security Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://abrroadlines.com',
  'https://www.abrroadlines.com',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev, customize for strict prod
    },
    credentials: true,
  })
);

// Body parsing with limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Logging
const morganStream = {
  write: (message) => logger.info(message.trim()),
};
app.use(morgan('combined', { stream: morganStream }));

// Rate Limiting on API endpoints
app.use('/api', apiLimiter);

// Main API Routes
app.use('/api', apiRoutes);

// Root Health & Metadata
app.get('/', (req, res) => {
  res.json({
    service: 'ABR Roadlines Pvt. Ltd. API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// Centralized Error Handling
app.use(errorHandler);

// Start Server
let server = null;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    logger.info(`🚛 ABR Roadlines API Server running on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}

// Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down server...');
  server.close(() => {
    process.exit(0);
  });
});

export default app;

