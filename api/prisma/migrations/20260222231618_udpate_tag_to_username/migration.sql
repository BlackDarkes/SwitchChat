/*
  Warnings:

  - The values [CHANEL] on the enum `EnumChatTypes` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `tag` on the `chat` table. All the data in the column will be lost.
  - You are about to drop the column `tag` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `chat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumChatTypes_new" AS ENUM ('DIRECT', 'GROUP', 'CHANNEL');
ALTER TABLE "public"."chat" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "chat" ALTER COLUMN "type" TYPE "EnumChatTypes_new" USING ("type"::text::"EnumChatTypes_new");
ALTER TYPE "EnumChatTypes" RENAME TO "EnumChatTypes_old";
ALTER TYPE "EnumChatTypes_new" RENAME TO "EnumChatTypes";
DROP TYPE "public"."EnumChatTypes_old";
ALTER TABLE "chat" ALTER COLUMN "type" SET DEFAULT 'GROUP';
COMMIT;

-- DropIndex
DROP INDEX "chat_name_tag_idx";

-- DropIndex
DROP INDEX "user_tag_key";

-- DropIndex
DROP INDEX "user_tag_name_idx";

-- AlterTable
ALTER TABLE "chat" DROP COLUMN "tag",
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "tag",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chat_username_key" ON "chat"("username");

-- CreateIndex
CREATE INDEX "chat_name_username_idx" ON "chat"("name", "username");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "user_username_name_idx" ON "user"("username", "name");
