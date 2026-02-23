/*
  Warnings:

  - A unique constraint covering the columns `[chat_id,user_id]` on the table `chat_member` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chat_member_chat_id_user_id_key" ON "chat_member"("chat_id", "user_id");
