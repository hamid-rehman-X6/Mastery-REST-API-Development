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

/**
 * Controllers
 */

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';

const router = Router();

router.post('/', authenticate, authorize(['admin']));

export default router;
