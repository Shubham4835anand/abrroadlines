import express from 'express';
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', requireAuth, createBlog);
router.delete('/:id', requireAuth, deleteBlog);

export default router;

