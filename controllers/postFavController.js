import httpStatus from "../helpers/httpStatus.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const postFavController = () => {
  const markAsFavorite = async (request, response, next) => {
    const { body } = request;
    const postId = Number(body?.postId ?? null);
    const userId = Number(body?.userId ?? null);

    try {
        const favoritePost = await prisma.usersFavoritePosts.create({
            data: {
                postId,
                userId,
            }
        })

        return response.status(httpStatus.CREATED).json(favoritePost);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const unmarkAsFavorite = async (request, response, next) => {
    const { body } = request;
    const postId = Number(body?.postId ?? null);
    const userId = Number(body?.userId ?? null);

    try {
      const deletedFavorite = await prisma.usersFavoritePosts.deleteMany({
        where: {
          postId,
          userId,
        },
      });

      if (deletedFavorite.count === 0) {
        return response.status(httpStatus.NOT_FOUND).json({
          message: "Favorite post not found",
        });
      }

      return response.status(httpStatus.OK).json({
        message: "Post unfavorited successfully",
      });
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getFavoritePostsByUser  = async (request, response, next) => {
    const { userId } = request.params;

    try {
      const favoritePosts = await prisma.usersFavoritePosts.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          post: true
        },
      });

      return response.status(httpStatus.OK).json(favoritePosts);

    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  const getUsersByFavoritePost = async (request, response, next) => {
    const { postId } = request.params;

    try {
      const users = await prisma.usersFavoritePosts.findMany({
        where: {
          postId: Number(postId),
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
    getFavoritePostsByUser,
    getUsersByFavoritePost
  }
};
