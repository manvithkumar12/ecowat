/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserEnergyData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserEnergyData_userId_key" ON "UserEnergyData"("userId");
