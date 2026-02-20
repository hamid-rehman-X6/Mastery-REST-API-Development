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
import { registerValidator } from '@/validators/auth.validator';

/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';

/**
 * Middlewares
 */
import validationError from '@/middlewares/validationError';

const router = Router();

router.post('/register', registerValidator, validationError, register);

export default router;
