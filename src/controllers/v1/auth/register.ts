/** 
 * @copyright 2025 HamidRehman
 * @license Apache-2.0
 */

/**
 * Custom Modules
 */
import { logger } from "@/lib/winston";
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

const register = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(201).json({
            message: 'New user registered successfully',
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