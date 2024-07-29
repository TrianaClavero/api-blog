import httpStatus from "../helpers/httpStatus.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const commentFavController = () => {
  const markAsFavorite = async (request, response, next) => {
    const { body } = request;
    const commentId = Number(body?.commentId ?? null);
    const userId = Number(body?.userId ?? null);

    try {
        const favoriteComment = await prisma.usersFavoriteComments.create({
            data: {
                commentId,
                userId,
            }
        })

        return response.status(httpStatus.CREATED).json(favoriteComment);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const unmarkAsFavorite = async (request, response, next) => {
    const { body } = request;
    const commentId = Number(body?.commentId ?? null);
    const userId = Number(body?.userId ?? null);

    try {
      const deletedFavorite = await prisma.usersFavoriteComments.deleteMany({
        where: {
          commentId,
          userId,
        },
      });

      if (deletedFavorite.count === 0) {
        return response.status(httpStatus.NOT_FOUND).json({
          message: "Favorite comment not found",
        });
      }

      return response.status(httpStatus.OK).json({
        message: "Comment unfavorited successfully",
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getFavoriteCommentsByUser  = async (request, response, next) => {
    const { userId } = request.params;

    try {
      const favoriteComment = await prisma.usersFavoriteComments.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          comment: true
        },
      });

      return response.status(httpStatus.OK).json(favoriteComment);

    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  const getUsersByFavoriteComments = async (request, response, next) => {
    const { commentId } = request.params;

    try {
      const users = await prisma.usersFavoriteComments.findMany({
        where: {
          commentId: Number(commentId),
        },
        include: {
          user:{
            select: {
              username: true
            }
          }
        }
      });
      

      return response.status(httpStatus.OK).json(users);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  return {
    markAsFavorite,
    unmarkAsFavorite,
    getFavoriteCommentsByUser,
    getUsersByFavoriteComments
    
  }
};
