-- CreateTable
CREATE TABLE "users_favorite_comments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_favorite_comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_favorite_comments_userId_commentId_key" ON "users_favorite_comments"("userId", "commentId");

-- AddForeignKey
ALTER TABLE "users_favorite_comments" ADD CONSTRAINT "users_favorite_comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favorite_comments" ADD CONSTRAINT "users_favorite_comments_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
