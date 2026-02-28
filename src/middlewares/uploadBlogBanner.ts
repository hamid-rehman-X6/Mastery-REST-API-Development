/**
 * @copyright 2025 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import multer from 'multer';

/**
 * Custom Modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Blog from '@/models/blog';

/**
 * Types
 */
import type { Request, Response, NextFunction } from 'express';

/**
 * Constants
 */
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const uploadBlogBanner = (method: 'post' | 'put') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (method === 'put' && !req.file) {
      next();
      return;
    }

    if (!req.file) {
      res.status(400).json({
        code: 'ValidationError',
        message: 'Banner image is required',
      });
      return;
    }

    if (req.file.size > MAX_FILE_SIZE) {
      res.status(413).json({
        code: 'ValidationError',
        message: 'Banner image must be less than 2MB',
      });
      return;
    }

    try {
      const { blogId } = req.params;
      const blog = await Blog.findById(blogId).select('banner.publicId').exec();
    } catch (err) {
      res.status(500).json({
        code: 'ServerError',
        message: 'Internal Server Error',
        error: err instanceof Error ? err.message : 'Unknown error',
      });
    }
  };
};

export default uploadBlogBanner;
