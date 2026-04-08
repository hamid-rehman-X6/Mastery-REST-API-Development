/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

import { body, param } from 'express-validator';

export const likeBlogValidator = [
  param('blogId').isMongoId().withMessage('Invalid blog ID'),
  body('userId')
    .notEmpty()
    .withMessage('User id is required')
    .isMongoId()
    .withMessage('Invalid user ID'),
];
