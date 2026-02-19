/** 
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import jwt from 'jsonwebtoken';

/**
 * Custom Modules
 */
import config from '@/config';

/**
 * Types
 */
import { Types } from 'mongoose';

export const generateAccessToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId }, config.JWT_ACCESS_SECRET, {
        expiresIn: config.ACCESS_TOKEN_EXPIRES,
        subject: 'accessToken',
    } )
}

export const generateRefreshToken = (userId: Types.ObjectId) => {
    return jwt.sign({ userId }, config.JWT_REFRESH_SECRET, {
        expiresIn: config.REFRESH_TOKEN_EXPIRES,
        subject: 'refreshToken',
    } )
}