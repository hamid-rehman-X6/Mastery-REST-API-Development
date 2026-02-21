/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Custom modules
 */
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt';
import { logger } from '@/lib/winston';
import config from '@/config';

/**
 * Models
 */
import User from '@/models/user';
import Token from '@/models/token';

/**
 * Types
 */
import { Request, Response } from 'express';
import { IUser } from '@/models/user';
import { log } from 'console';

type UserData = Pick<IUser, 'email' | 'password'>;

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body as UserData;
    const user = await User.findOne({ email })
      .select('username email password role')
      .lean()
      .exec();

    if (!user) {
      res.status(404).json({
        code: 'NotFound',
        message: 'User not found',
      });
      logger.warn(`Login attempt with non-existent email: ${email}`);
      return;
    }

    // Generate access and refresh tokens for the user
    const accessToken = generateAccessToken(user?._id);
    const refreshToken = generateRefreshToken(user?._id);

    // Store refresh token in database
    await Token.create({ token: refreshToken, userId: user?._id });
    logger.info('Refresh token created for user', {
      userId: user?._id,
      token: refreshToken,
    });

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: config.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      user: {
        username: user?.username,
        email: user?.email,
        role: user?.role,
      },
      accessToken,
    });
    logger.info(`User logged in successfully: ${email}`);
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });
    logger.error('Error during login', err);
  }
};

export default login;
