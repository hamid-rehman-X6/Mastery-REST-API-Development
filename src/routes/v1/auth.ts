/** 
 * @copyright 2025 HamidRehman
 * @license Apache-2.0
 */


/**
 * Node Modules
 */
import { Router } from "express";
import { body } from 'express-validator';

/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';

/**
 * Middlewares
 */

/**
 * Models
 */

const router = Router();

router.post(
    '/register',
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isLength({ max: 255 })
        .withMessage('Email must be at most 255 characters long')
        .isEmail()
        .withMessage('Invalid email format'), 
    register,
);

export default router;