import { Router } from "express";
import { usersController} from '../controllers/usersController.js'

export const userRouters = () => {
  const userRouter = Router();
  const { register, login, profile, refreshToken , getUsers, getUserById, updateById, deleteById } = usersController()

  userRouter.post('/register', register)
  userRouter.post('/login', login)
  userRouter.get('/profile/:id', profile)
  userRouter.post('/refresh-token', refreshToken)

  userRouter.route("/users")
    .get(getUsers)

  userRouter.route("/users/:id")
    .get(getUserById)
    .patch(updateById)
    .delete(deleteById)
  return userRouter;
};