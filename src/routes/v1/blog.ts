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
import {
  blogIdParamsValidator,
  createBlogValidator,
  getAllBlogsValidator,
  getBlogSlugValidator,
} from '@/validators/blog.validator';

/**
 * Controllers
 */
import createBlog from '@/controllers/v1/blog/create_blog';
import getAllBlogs from '@/controllers/v1/blog/get_all_blogs';
import getBlogsByUser from '@/controllers/v1/blog/get_blogs_by_user';
import getBlogsBySlug from '@/controllers/v1/blog/get_blog_by_slug';
import updateBlog from '@/controllers/v1/blog/update_blog';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';
import validationError from '@/middlewares/validationError';
import { param } from 'express-validator';

const upload = multer();
const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  createBlogValidator,
  validationError,
  uploadBlogBanner('post'),
  createBlog,
);

router.get(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  getAllBlogsValidator,
  validationError,
  getAllBlogs,
);

router.get(
  '/user/:userId',
  authenticate,
  authorize(['admin', 'user']),
  param('userId').isMongoId().withMessage('Invalid user ID'),
  getAllBlogsValidator,
  validationError,
  getBlogsByUser,
);

router.get(
  '/:slug',
  authenticate,
  authorize(['admin', 'user']),
  getBlogSlugValidator,
  validationError,
  getBlogsBySlug,
);

router.put(
  '/:blogId',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  blogIdParamsValidator,
  validationError,
  uploadBlogBanner('put'),
  updateBlog,
);

export default router;
