/*
  Warnings:

  - You are about to drop the column `applianceId` on the `UsedAppliance` table. All the data in the column will be lost.
  - You are about to drop the column `usageHours` on the `UsedAppliance` table. All the data in the column will be lost.
  - You are about to drop the column `userDataId` on the `UsedAppliance` table. All the data in the column will be lost.
  - Added the required column `applianceName` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursUsed` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsedAppliance" DROP CONSTRAINT "UsedAppliance_applianceId_fkey";

-- DropForeignKey
ALTER TABLE "UsedAppliance" DROP CONSTRAINT "UsedAppliance_userDataId_fkey";

-- DropIndex
DROP INDEX "UsedAppliance_applianceId_idx";

-- AlterTable
ALTER TABLE "UsedAppliance" DROP COLUMN "applianceId",
DROP COLUMN "usageHours",
DROP COLUMN "userDataId",
ADD COLUMN     "applianceName" TEXT NOT NULL,
ADD COLUMN     "hoursUsed" INTEGER NOT NULL;
