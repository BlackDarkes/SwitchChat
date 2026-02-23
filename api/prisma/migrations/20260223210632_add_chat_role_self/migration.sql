-- AlterEnum
ALTER TYPE "EnumChatTypes" ADD VALUE 'SELF';

-- AlterTable
ALTER TABLE "chat" ALTER COLUMN "name" DROP NOT NULL;
