-- CreateTable
CREATE TABLE "users_favorite_posts" (
    "postId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "users_favorite_posts_postId_userId_key" ON "users_favorite_posts"("postId", "userId");
