-- DropForeignKey
ALTER TABLE "Appliance" DROP CONSTRAINT "Appliance_userDataId_fkey";

-- DropForeignKey
ALTER TABLE "DailyUsage" DROP CONSTRAINT "DailyUsage_userId_fkey";

-- DropForeignKey
ALTER TABLE "PredictedUsage" DROP CONSTRAINT "PredictedUsage_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsedAppliance" DROP CONSTRAINT "UsedAppliance_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserEnergyData" DROP CONSTRAINT "UserEnergyData_userId_fkey";

-- DropForeignKey
ALTER TABLE "scheduledApplication" DROP CONSTRAINT "scheduledApplication_applianceId_fkey";

-- DropForeignKey
ALTER TABLE "scheduledApplication" DROP CONSTRAINT "scheduledApplication_userId_fkey";

-- AddForeignKey
ALTER TABLE "UserEnergyData" ADD CONSTRAINT "UserEnergyData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appliance" ADD CONSTRAINT "Appliance_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserEnergyData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsedAppliance" ADD CONSTRAINT "UsedAppliance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyUsage" ADD CONSTRAINT "DailyUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PredictedUsage" ADD CONSTRAINT "PredictedUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduledApplication" ADD CONSTRAINT "scheduledApplication_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduledApplication" ADD CONSTRAINT "scheduledApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
