-- DropIndex
DROP INDEX "message_user_id_created_at_idx";

-- AlterTable
ALTER TABLE "message" ADD COLUMN     "is_pined" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "message_user_id_is_pined_created_at_idx" ON "message"("user_id", "is_pined", "created_at");
