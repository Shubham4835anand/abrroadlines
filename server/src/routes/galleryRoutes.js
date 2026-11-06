import express from 'express';
import { getAllGallery, createGalleryItem } from '../controllers/galleryController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllGallery);
router.post('/', requireAuth, createGalleryItem);

export default router;

