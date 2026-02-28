/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { Router } from 'express';
import multer from 'multer';

/**
 * Custom Modules
 */
import { createBlogValidator } from '@/validators/blog.validator';

/**
 * Controllers
 */
import createBlog from '@/controllers/v1/blog/create_blog';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';
import validationError from '@/middlewares/validationError';

const upload = multer();
const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  uploadBlogBanner('post'),
  createBlogValidator,
  validationError,
  createBlog,
);

export default router;
