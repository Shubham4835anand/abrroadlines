import express from 'express';
import authRoutes from './authRoutes.js';
import contactRoutes from './contactRoutes.js';
import quoteRoutes from './quoteRoutes.js';
import blogRoutes from './blogRoutes.js';
import galleryRoutes from './galleryRoutes.js';
import trackingRoutes from './trackingRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/quote', quoteRoutes);
router.use('/blogs', blogRoutes);
router.use('/gallery', galleryRoutes);
router.use('/tracking', trackingRoutes);

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'ABR Roadlines API',
  });
});

export default router;

