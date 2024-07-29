import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { expressjwt as ejwt } from "express-jwt";
import { postRouters } from "./routes/postRouter.js";
import { commentRouters } from "./routes/commentRouter.js";
import { userRouters } from "./routes/userRouter.js";
import { postFavRouters } from "./routes/postFavRouter.js";
import { commentFavRouters } from "./routes/commentFavRouter.js";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);

app.use(
  ejwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/login", "/api/register, /api/refresh-token"],
  })
);
app.use(
  "/api",
  postRouters(),
  commentRouters(),
  userRouters(),
  postFavRouters(),
  commentFavRouters()
);
app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
