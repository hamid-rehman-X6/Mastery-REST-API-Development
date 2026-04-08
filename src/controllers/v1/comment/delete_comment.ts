/**
 * @copyright 2026 HamidRehman
 * @license Apache-2.0
 */

/**
 * Custom Modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Blog from '@/models/blog';
import Comment from '@/models/comment';
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';

const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { commentId } = req.params;
  const currentUserId = req.userId;

  try {
    const comment = await Comment.findById(commentId)
      .select('blogId userId')
      .lean()
      .exec();

    const user = await User.findById(currentUserId)
      .select('role')
      .lean()
      .exec();

    if (!comment) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Comment not found',
      });
      return;
    }

    const blog = await Blog.findById(comment?.blogId)
      .select('commentsCount')
      .exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }

    if (comment.userId !== currentUserId && user?.role !== 'admin') {
      res.status(403).json({
        code: 'AuthorizationError',
        message:
          'Access denied. You do not have permission to delete this comment.',
      });

      logger.warn('A user tried to delete a comment without permission', {
        commentId,
        userId: currentUserId,
      });
      return;
    }

    await Comment.deleteOne({ _id: commentId });

    logger.info('Comment deleted successfully', { commentId });

    blog.commentsCount--;
    await blog.save();

    logger.info('Blog comment count updated successfully', {
      blogId: blog._id,
      commentsCount: blog.commentsCount,
    });

    res.status(200).json({
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    res.status(505).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err instanceof Error ? err.message : 'Unknown error',
    });

    logger.error('Error deleting comment', err);
  }
};

export default deleteComment;
