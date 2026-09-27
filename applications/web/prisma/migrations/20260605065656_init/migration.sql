-- CreateTable
CREATE TABLE "UsedAppliance" (
    "id" SERIAL NOT NULL,
    "applianceId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usage" INTEGER NOT NULL,

    CONSTRAINT "UsedAppliance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UsedAppliance_userId_idx" ON "UsedAppliance"("userId");

-- CreateIndex
CREATE INDEX "UsedAppliance_applianceId_idx" ON "UsedAppliance"("applianceId");

-- CreateIndex
CREATE INDEX "UsedAppliance_date_idx" ON "UsedAppliance"("date");

-- AddForeignKey
ALTER TABLE "UsedAppliance" ADD CONSTRAINT "UsedAppliance_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsedAppliance" ADD CONSTRAINT "UsedAppliance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
