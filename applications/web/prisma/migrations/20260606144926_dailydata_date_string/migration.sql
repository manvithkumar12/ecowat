/*
  Warnings:

  - You are about to drop the column `pricePerkwh` on the `UsedAppliance` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `UsedAppliance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UsedAppliance" DROP COLUMN "pricePerkwh",
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
