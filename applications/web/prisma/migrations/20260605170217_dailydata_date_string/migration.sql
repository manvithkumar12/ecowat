/*
  Warnings:

  - You are about to drop the column `usage` on the `UsedAppliance` table. All the data in the column will be lost.
  - Added the required column `daily` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoursUsage` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsedAppliance" DROP COLUMN "usage",
ADD COLUMN     "daily" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hoursUsage" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;
