/** 
 * @copyright 2025 HamidRehman
 * @license Apache-2.0
 */

/**
 * Custom Modules
 */
import { logger } from "@/lib/winston";
import { generateRandomUserName } from "@/utils";
import config from "@/config";

/** 
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import { Request, Response } from "express";
import { IUser } from "@/models/user";

type UserData = Pick<IUser, 'email' | 'password' | 'role'>

const register = async (req: Request, res: Response): Promise<void> => {

    const  { email, password, role } = req.body as UserData;
    try {
        const username = generateRandomUserName();
        const newUser = await User.create({
            username,
            email,password,
            role,
        });

        // Generate access token and refresh token for new user

        res.status(201).json({
            user: {
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            }
        })

    } catch (err) {
        res.status(500).json({
            code: 'ServerError',
            message: 'Internal Server Error',
            error: err
        });

        logger.error('Error during user registration', err);
    }
};

export default register;