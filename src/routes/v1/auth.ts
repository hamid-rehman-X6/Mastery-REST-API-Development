/** 
 * @copyright 2026 HamidRehman
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
import validationError from "@/middlewares/validationError";

/**
 * Models
 */
import User from "@/models/user";

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
        .withMessage('Invalid email format')
        .custom(async (value) => {
            const userExists = await User.exists({ email: value });
            if (userExists) {
                throw new Error('User email or password is invalid');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('role')
        .optional()
        .isString()
        .withMessage('Role must be a string')
        .isIn(['user', 'admin'])
        .withMessage('Role must be either user or admin'),
    validationError,
    register,
);

export default router;