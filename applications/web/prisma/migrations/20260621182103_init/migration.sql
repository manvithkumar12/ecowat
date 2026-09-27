/*
  Warnings:

  - You are about to drop the column `power` on the `RescheduledApplication` table. All the data in the column will be lost.
  - Added the required column `powerConsumed` to the `RescheduledApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RescheduledApplication" DROP COLUMN "power",
ADD COLUMN     "powerConsumed" DOUBLE PRECISION NOT NULL;
