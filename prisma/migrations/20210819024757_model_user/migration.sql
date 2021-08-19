-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "bannerColor" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.tag_unique" ON "User"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "User.avatar_unique" ON "User"("avatar");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");
