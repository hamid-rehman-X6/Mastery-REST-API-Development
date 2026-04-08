/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

import { body, param } from 'express-validator';

export const commentBlogValidator = [
  param('blogId').isMongoId().withMessage('Invalid blog ID'),
  body('content').trim().notEmpty().withMessage('Content is required'),
];
