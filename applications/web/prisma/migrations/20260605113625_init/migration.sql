/*
  Warnings:

  - A unique constraint covering the columns `[creationDate]` on the table `dailyData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "dailyData_creationDate_key" ON "dailyData"("creationDate");
