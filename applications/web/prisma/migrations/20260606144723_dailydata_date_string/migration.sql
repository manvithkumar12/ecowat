/*
  Warnings:

  - Added the required column `pricePerkwh` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsedAppliance" ADD COLUMN     "pricePerkwh" DOUBLE PRECISION NOT NULL;
