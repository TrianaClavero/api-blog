import { PrismaClient } from "@prisma/client";
import httpStatus from '../helpers/httpStatus.js';

const prisma = new PrismaClient();

export const commentsController = () => {
  const getComments = async (_request, response, next) => {
    try {
      const comments = await prisma.comment.findMany();

      response.status(httpStatus.OK).json(comments);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const createComment = async (request, response, next) => {
    const { content, authorId, postId } = request.body;

    if (!content || !authorId || !postId) {
      return response.status(httpStatus.BAD_REQUEST).json({ message: 'All fields are required' });
    }

    try {
      const responseFormat = await prisma.comment.create({
        data: {
          content,
          authorId,
          postId,
        },
      });
      return response.status(httpStatus.CREATED).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getCommentById = async (request, response, next) => {
    const { id } = request.params;
    const commentId = Number(id);
    try {
      const comment = await prisma.comment.findUnique({
        where: { id: commentId },
      });
      const responseFormat = {
        data: comment,
        message: "Comment found successfully",
      };
      return response.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getCommentsByUserId = async (request, response, next) => {
    const { userId } = request.params;
    const userIntId = parseInt(userId, 10);

    if (isNaN(userIntId)) {
      return response.status(400).json({ message: 'Invalid user ID' });
    }

    try {
      const comments = await prisma.comment.findMany({
        where: { authorId: userIntId },
        select: {
          content: true,
          User: {
            select: {
              username: true
            }
          }
        }
      });

      if (comments.length === 0) {
        return response.status(404).json({ message: 'No comments found for this user' });
      }

      return response.status(200).json(comments);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateById = async (request, response, next) => {
    const { id } = request.params;
    const commentId = Number(id);
    const newCommentData = request.body;
    try {
      const comment = await prisma.comment.update({
        where: { id: commentId },
        data: newCommentData,
      });
      const responseFormat = {
        data: comment,
        message: "Comment updated successfully",
      };
      return response.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const deleteById = async (request, response, next) => {
    const { id } = request.params;
    const commentId = Number(id);
    try {
      const comment = await prisma.comment.delete({ where: { id: commentId } });
      const responseFormat = {
        data: comment,
        message: "Comment deleted successfully",
      };
      return response.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getCommentsByPostId = async (request, response, next) => {
    const { postId } = request.params;
    const parsedPostId = Number(postId);

    if (isNaN(parsedPostId)) {
      return response.status(httpStatus.BAD_REQUEST).json({ message: 'Invalid post ID' });
    }

    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: parsedPostId,
        },
        select: {
          content: true,
          User: {
            select: {
              username: true,
            },
          }
        }
      });

      const responseFormat = comments.map(comment => ({
        content: comment.content,
        username: comment.User.username,
      }));

      return response.status(httpStatus.OK).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    getComments,
    createComment,
    getCommentById,
    getCommentsByUserId,
    updateById,
    deleteById,
    getCommentsByPostId,
  };
};
