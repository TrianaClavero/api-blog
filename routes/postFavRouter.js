import { Router } from "express";
import { postFavController } from "../controllers/postFavController.js";

export const postFavRouters = () => {
  const postFavRouter = Router();
  const { markAsFavorite, unmarkAsFavorite, getUsersByFavoritePost, getFavoritePostsByUser  } = postFavController();

  postFavRouter.route("/post-fav")
    .post(markAsFavorite)
    .delete(unmarkAsFavorite)

  postFavRouter.get("/user/:userId/post-favs", getFavoritePostsByUser);
  postFavRouter.get("/post/:postId/users", getUsersByFavoritePost);
  return postFavRouter;
};
