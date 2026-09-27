-- AlterTable
ALTER TABLE "User" ADD COLUMN     "limit" INTEGER DEFAULT 0,
ADD COLUMN     "resetAt" TIMESTAMP(3);
