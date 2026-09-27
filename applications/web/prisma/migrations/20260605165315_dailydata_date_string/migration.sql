/*
  Warnings:

  - Added the required column `userDataId` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appliance" ALTER COLUMN "userDataId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "UsedAppliance" ADD COLUMN     "userDataId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "UsedAppliance" ADD CONSTRAINT "UsedAppliance_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserEnergyData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
