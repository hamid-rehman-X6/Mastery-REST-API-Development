/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { Router } from 'express';
import { param, body, query } from 'express-validator';

/**
 * Middlewares
 */
import validationError from '@/middlewares/validationError';
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';

/**
 * Models
 */
import User from '@/models/user';

const router = Router();

router.get('/current', authenticate, authorize(['admin', 'user']));

export default router;
