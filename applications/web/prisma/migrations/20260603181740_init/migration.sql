/*
  Warnings:

  - Made the column `userDataId` on table `Appliance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Appliance" DROP CONSTRAINT "Appliance_userDataId_fkey";

-- AlterTable
ALTER TABLE "Appliance" ALTER COLUMN "userDataId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Appliance" ADD CONSTRAINT "Appliance_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserEnergyData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
