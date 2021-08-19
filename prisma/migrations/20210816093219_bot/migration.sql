-- CreateTable
CREATE TABLE "bot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "invitelink" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bot.invitelink_unique" ON "bot"("invitelink");
