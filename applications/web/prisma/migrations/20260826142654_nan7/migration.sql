/*
  Warnings:

  - You are about to drop the column `slot` on the `carbonEmission` table. All the data in the column will be lost.
  - Added the required column `timeStart` to the `carbonEmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeStop` to the `carbonEmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carbonEmission" DROP COLUMN "slot",
ADD COLUMN     "timeStart" TEXT NOT NULL,
ADD COLUMN     "timeStop" TEXT NOT NULL;
