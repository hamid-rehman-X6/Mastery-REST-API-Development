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
import Comment from '@/models/comment';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { IComment } from '@/models/comment';

type CommentData = Pick<IComment, 'content'>;

/**
 * Purify the comment content
 */
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const commentBlog = async (req: Request, res: Response): Promise<void> => {
  const { blogId } = req.params;
  const { content } = req.body as CommentData;
  const userId = req.userId;

  try {
    const blog = await Blog.findById(blogId).select('_id commentsCount').exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }

    const cleanContent = purify.sanitize(content);
    const newComment = await Comment.create({
      blogId,
      content: cleanContent,
      userId,
    });

    logger.info('New Comment created', newComment);

    blog.commentsCount++;
    await blog.save();

    logger.info('Blog comment added successfully', {
      blogId: blog._id,
      commentsCount: blog.commentsCount,
    });

    res.status(201).json({
      commentsCount: newComment,
    });
  } catch (err) {
    res.status(505).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });

    logger.error('Error during commenting in blog', err);
  }
};

export default commentBlog;
