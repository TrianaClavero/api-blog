import { Router } from "express";
import { postsController} from '../controllers/postsController.js'
import { schemaValidator } from '../middlewares/postValidations.js'
import { bodyPostSchema, updatePostSchema } from '../schemas/postSchemas.js'

export const postRouters = () => {
  const postRouter = Router();
  const { getPosts, createPost, getPostById, updateById, deleteById } = postsController()

  postRouter.route("/posts")
    .get(getPosts)
    .post(schemaValidator(bodyPostSchema), createPost)

  postRouter.route("/posts/:id")
    .get(getPostById)
    .patch(schemaValidator(updatePostSchema), updateById)
    .delete( deleteById)
  return postRouter;
};