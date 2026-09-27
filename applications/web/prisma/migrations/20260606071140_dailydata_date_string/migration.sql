/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `PredictedUsage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PredictedUsage_userId_date_idx";

-- CreateIndex
CREATE UNIQUE INDEX "PredictedUsage_userId_date_key" ON "PredictedUsage"("userId", "date");
