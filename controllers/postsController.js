import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postsController = () => {
  const getPosts = async (request, response, next) => {
    const { query } = request;
    try {
      const posts = await prisma.post.findMany({
        where: {
          content: {
            contains: query?.content ?? ''
          }
        }
      });

      response.status(200).json(posts);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const createPost = async (request, response, next) => {
    const { content, imageUrl, userId } = request.body;
    try {
      const createdPost = await prisma.post.create({
       data: {
          content,
          imageUrl,
          userId
        } 
      }

      );

      const responseFormat = {
        data: createdPost,
        message: "Post created successfully",
      };
      return response.status(200).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const getPostById = async (request, response, next) => {
    const { id } = request.params;
    const postId = Number(id);
    try {
      const post = await prisma.post.findUnique({ where: { id: postId } });
      const responseFormat = {
        data: post,
        message: "Post found successfully",
      };
      return response.status(200).json(responseFormat);
    } catch (error) {
      next(error);
    } finally {
      await prisma.$disconnect();
    }
  };

  const updateById = async (request, response, next) => {
    const { id } = request.params;
    const postId = Number(id);
    const newPostData = request.body
    try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: newPostData
    })
    const responseFormat = {
      data: post,
      message: "Post updated successfully"
    }
    return response.status(200).json(responseFormat)

   } catch (error) {
    next(error);
   } finally { 
     await prisma.$disconnect();
   }
  };

  const deleteById = async (request, response, next) => {
    const { id } = request.params;
    const postId = Number(id);
    try {
    const post = await prisma.post.delete({ where: { id: postId } })
    const responseFormat = {
      data: post,
      message: "Post deleted successfully",
    }
    return response.status(200).json(responseFormat)

   } catch (error) {
    next(error);
   } finally { 
     await prisma.$disconnect();
   }
  };

  return {
    getPosts,
    createPost,
    getPostById,
    updateById,
    deleteById,
  };
};
