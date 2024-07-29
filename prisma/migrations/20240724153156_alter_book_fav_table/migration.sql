-- AddForeignKey
ALTER TABLE "users_favorite_posts" ADD CONSTRAINT "users_favorite_posts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favorite_posts" ADD CONSTRAINT "users_favorite_posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
