/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { Router } from 'express';

/**
 * Custom Modules
 */
import { commentBlogValidator } from '@/validators/comment.validator';

/**
 * Controllers
 */
import commentBlog from '@/controllers/v1/comment/comment_blog';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import validationError from '@/middlewares/validationError';

const router = Router();

router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  commentBlogValidator,
  validationError,
  commentBlog,
);

export default router;
