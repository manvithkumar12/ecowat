/*
  Warnings:

  - You are about to drop the column `perHour` on the `Appliance` table. All the data in the column will be lost.
  - You are about to drop the column `usage` on the `Appliance` table. All the data in the column will be lost.
  - You are about to drop the column `daily` on the `UsedAppliance` table. All the data in the column will be lost.
  - You are about to drop the column `hoursUsage` on the `UsedAppliance` table. All the data in the column will be lost.
  - Added the required column `kwh` to the `Appliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usageHours` to the `Appliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kwh` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usageHours` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appliance" DROP COLUMN "perHour",
DROP COLUMN "usage",
ADD COLUMN     "kwh" INTEGER NOT NULL,
ADD COLUMN     "usageHours" INTEGER NOT NULL,
ALTER COLUMN "userDataId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UsedAppliance" DROP COLUMN "daily",
DROP COLUMN "hoursUsage",
ADD COLUMN     "kwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "usageHours" INTEGER NOT NULL;
