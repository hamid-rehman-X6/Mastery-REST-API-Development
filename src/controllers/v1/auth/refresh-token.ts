/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

/**
 * Custom Modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Token from '@/models/token';

/**
 * Types
 */
import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import { generateAccessToken, verifyRefreshToken } from '@/lib/jwt';

const refreshToken = async (req: Request, res: Response): Promise<void> => {
  const getRefreshToken = req.cookies.refreshToken as string;
  try {
    const tokenExists = await Token.exists({ token: getRefreshToken });

    if (!tokenExists) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid refresh token',
      });
      return;
    }

    // Verfiy the refresh token

    const jwtPayload = verifyRefreshToken(getRefreshToken) as {
      userId: Types.ObjectId;
    };

    // Generate new access token
    const newAccessToken = generateAccessToken(jwtPayload?.userId);
    res.status(200).json({
      code: 'Success',
      message: 'Access token refreshed successfully',
      accessToken: newAccessToken,
    });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Refresh token expired, please login again',
      });
      return;
    }

    if (err instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid refresh token',
      });
      return;
    }

    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });

    logger.error('Error refreshing token', err);
  }
};

export default refreshToken;
