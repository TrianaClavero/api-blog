import { Router } from "express";
import { commentFavController } from "../controllers/commentsFavController.js";

export const commentFavRouters = () => {
  const commentFavRouter = Router();
  const { markAsFavorite, unmarkAsFavorite, getUsersByFavoriteComments, getFavoriteCommentsByUser  } = commentFavController();

  commentFavRouter.route("/comment-fav")
    .post(markAsFavorite)
    .delete(unmarkAsFavorite)

  commentFavRouter.get("/user/:userId/comment-favs", getFavoriteCommentsByUser);
  commentFavRouter.get("/comment/:commentId/users", getUsersByFavoriteComments);
  return commentFavRouter;
};
