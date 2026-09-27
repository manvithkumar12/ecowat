/*
  Warnings:

  - Made the column `userId` on table `UserEnergyData` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserEnergyData" DROP CONSTRAINT "UserEnergyData_userId_fkey";

-- AlterTable
ALTER TABLE "UserEnergyData" ALTER COLUMN "monthlyBill" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserEnergyData" ADD CONSTRAINT "UserEnergyData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
