/*
  Warnings:

  - You are about to drop the `RescheduledApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RescheduledApplication" DROP CONSTRAINT "RescheduledApplication_applianceId_fkey";

-- DropForeignKey
ALTER TABLE "RescheduledApplication" DROP CONSTRAINT "RescheduledApplication_userId_fkey";

-- DropTable
DROP TABLE "RescheduledApplication";

-- CreateTable
CREATE TABLE "scheduledApplication" (
    "id" SERIAL NOT NULL,
    "applianceId" INTEGER NOT NULL,
    "startHour" TEXT NOT NULL,
    "endHour" TEXT NOT NULL,
    "powerConsumed" DOUBLE PRECISION NOT NULL,
    "rating" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "scheduledApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "scheduledApplication_userId_idx" ON "scheduledApplication"("userId");

-- CreateIndex
CREATE INDEX "scheduledApplication_applianceId_idx" ON "scheduledApplication"("applianceId");

-- AddForeignKey
ALTER TABLE "scheduledApplication" ADD CONSTRAINT "scheduledApplication_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduledApplication" ADD CONSTRAINT "scheduledApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
