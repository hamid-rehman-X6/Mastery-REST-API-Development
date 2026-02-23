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
import { verifyAccessToken } from '@/lib/jwt';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';
import type { Types } from 'mongoose';

/**
 * @function authenticate
 * @description Middleware to verify the user's access token from the Authorization header.
 *              If the token is valid, the user's ID is attached to the request object.
 *              Otherwise, it returns an appropriate error response.
 *
 * @param {Request} req - Express request object. Expects a Bearer token in the Authorization header.
 * @param {Response} res - Express response object used to send error responses if authentication fails.
 * @param {NextFunction} next - Express next function to pass control to the next middleware.
 *
 * @returns {void}
 */

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401).json({
      code: 'AuthenticationError',
      message: 'Access denied. No token provided.',
    });
    return;
  }

  // Split token from 'Bearer' prefix
  const [_, token] = authHeader.split(' ');

  try {
    // Verify the token and extract the userId from the payload
    const jwtPayload = verifyAccessToken(token) as { userId: Types.ObjectId };

    // Attach the userId to the request object for later use
    req.userId = jwtPayload.userId;

    // Proceed to the next middleware or route handler
    return next();
  } catch (err) {
    // Handle expired token error
    if (err instanceof TokenExpiredError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Access token has expired. Please log in again.',
      });
      return;
    }

    // Handle invalid token error
    if (err instanceof JsonWebTokenError) {
      res.status(401).json({
        code: 'AuthenticationError',
        message: 'Invalid access token. Please log in again.',
      });
      return;
    }

    // Catch any other unexpected errors
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
    logger.warn('Error during authentication', err);
  }
};

export default authenticate;
