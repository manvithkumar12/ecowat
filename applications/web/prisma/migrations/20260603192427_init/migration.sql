/*
  Warnings:

  - You are about to drop the column `monthlyBill` on the `UserEnergyData` table. All the data in the column will be lost.
  - Added the required column `monthlyConsumption` to the `UserEnergyData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserEnergyData" DROP COLUMN "monthlyBill",
ADD COLUMN     "monthlyConsumption" TEXT NOT NULL;
