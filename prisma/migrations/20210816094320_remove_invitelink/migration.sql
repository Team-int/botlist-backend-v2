/*
  Warnings:

  - You are about to drop the column `invitelink` on the `bot` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "bot.invitelink_unique";

-- AlterTable
ALTER TABLE "bot" DROP COLUMN "invitelink";
