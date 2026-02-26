/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { body } from 'express-validator';

/**
 * Models
 */
import User from '@/models/user';

export const updateUserValidator = [
  body('username')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Username must be at most 20 characters long')
    .custom(async (value) => {
      const userExists = await User.exists({ username: value });
      if (userExists) {
        throw new Error('This username is already in use');
      }
    }),

  body('email')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Email must be at most 50 characters long')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });
      if (!userExists) {
        throw new Error('This email is already in use');
      }
    }),

  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),

  body('first_name')
    .optional()
    .isLength({ min: 2, max: 20 })
    .withMessage('First name must be between 2 and 20 characters long'),

  body('last_name')
    .optional()
    .isLength({ min: 2, max: 20 })
    .withMessage('Last name must be between 2 and 20 characters long'),
  body(['website', 'facebook', 'instagram', 'linkedin', 'x', 'youtube'])
    .optional()
    .isURL()
    .withMessage('Invalid URL')
    .isLength({ max: 100 })
    .withMessage('URL must be less than 100 characters'),
];
