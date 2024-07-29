import { Router } from "express";
import { commentsController} from '../controllers/commentsController.js'

export const commentRouters = () => {
  const commentRouter = Router();
  const { getComments, createComment, getCommentById, getCommentsByUserId, updateById, deleteById, getCommentsByPostId } = commentsController()

  commentRouter.route("/comments")
    .get(getComments)
    .post(createComment)

  commentRouter.route("/comments/:id")
    .get(getCommentById)
    .patch(updateById)
    .delete(deleteById)

  commentRouter.get('/posts/:postId/comments', getCommentsByPostId);

  commentRouter.get('/comments/user/:userId', getCommentsByUserId);
  return commentRouter;
};