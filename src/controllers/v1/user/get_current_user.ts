/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select('-__v').lean().exec();

    res.status(200).json({
      code: 'Success',
      message: 'Current user retrieved successfully',
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });

    logger.warn('Error while getting current user', err);
  }
};

export default getCurrentUser;
