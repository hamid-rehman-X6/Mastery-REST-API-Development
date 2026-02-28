/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Node Modules
 */
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

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
import type { Request, Response } from 'express';
import type { IBlog } from '@/models/blog';

type BlogData = Pick<IBlog, 'title' | 'content' | 'banner' | 'status'>;

/**
 * Purify the blog content
 */
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const createBlog = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;
  try {
    const { title, content, banner, status } = req.body as BlogData;
    const sanitizContent = purify.sanitize(content);

    const newBlog = await Blog.create({
      title,
      content: sanitizContent,
      banner,
      status,
      author: userId,
    });

    logger.info('New Blog created successfully', newBlog);

    res.status(201).json({
      code: 'Success',
      message: 'Blog created successfully',
      blog: newBlog,
    });
  } catch (err) {
    res.status(505).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });

    logger.error('Error during blog creation', err);
  }
};

export default createBlog;
