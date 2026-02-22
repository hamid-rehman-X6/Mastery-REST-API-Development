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
import {
  loginValidator,
  refreshTokenValidator,
  registerValidator,
} from '@/validators/auth.validator';

/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh-token';
import logout from '@/controllers/v1/auth/logout';

/**
 * Middlewares
 */
import validationError from '@/middlewares/validationError';

const router = Router();

router.post('/register', registerValidator, validationError, register);

router.post('/login', loginValidator, validationError, login);

router.post(
  '/refresh-token',
  refreshTokenValidator,
  validationError,
  refreshToken,
);

router.post('/logout', logout);

export default router;
