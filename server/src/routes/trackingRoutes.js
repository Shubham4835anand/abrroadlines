import express from 'express';
import { trackByLr } from '../controllers/trackingController.js';

const router = express.Router();

router.get('/:lrNumber', trackByLr);

export default router;

