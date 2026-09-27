-- CreateTable
CREATE TABLE "RescheduledApplication" (
    "id" SERIAL NOT NULL,
    "applianceId" INTEGER NOT NULL,
    "startHour" TEXT NOT NULL,
    "endHour" TEXT NOT NULL,
    "power" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RescheduledApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RescheduledApplication_userId_idx" ON "RescheduledApplication"("userId");

-- CreateIndex
CREATE INDEX "RescheduledApplication_applianceId_idx" ON "RescheduledApplication"("applianceId");

-- AddForeignKey
ALTER TABLE "RescheduledApplication" ADD CONSTRAINT "RescheduledApplication_applianceId_fkey" FOREIGN KEY ("applianceId") REFERENCES "Appliance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RescheduledApplication" ADD CONSTRAINT "RescheduledApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
