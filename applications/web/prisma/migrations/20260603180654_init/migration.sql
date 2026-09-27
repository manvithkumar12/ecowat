-- CreateTable
CREATE TABLE "UserEnergyData" (
    "id" SERIAL NOT NULL,
    "houseHold" INTEGER NOT NULL,
    "hasSolar" BOOLEAN NOT NULL,
    "monthlyBill" INTEGER NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UserEnergyData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appliance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "usage" INTEGER NOT NULL,
    "perHour" INTEGER NOT NULL,
    "userDataId" INTEGER,

    CONSTRAINT "Appliance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserEnergyData" ADD CONSTRAINT "UserEnergyData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appliance" ADD CONSTRAINT "Appliance_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "UserEnergyData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
