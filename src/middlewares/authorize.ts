/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Custom Modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';

export type AuthRoles = 'admin' | 'user';

const authorize = (roles: AuthRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId;
    try {
      const user = await User.findById(userId).select('role');
      if (!user) {
        res.status(404).json({
          code: 'NotFound',
          message: 'User not found',
        });
        return;
      }

      if (!roles.includes(user.role)) {
        res.status(403).json({
          code: 'AuthorizationError',
          message: 'You do not have permission to access this resource',
        });
        return;
      }

      return next();
    } catch (err) {
      res.status(500).json({
        code: 'ServerError',
        message: 'Internal Server Error',
        error: err instanceof Error ? err.message : 'Unknown error',
      });

      logger.warn('Error while authorizing user', err);
    }
  };
};
export default authorize;
