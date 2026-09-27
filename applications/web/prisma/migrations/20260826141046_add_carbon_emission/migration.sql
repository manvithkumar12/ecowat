-- CreateTable
CREATE TABLE "carbonEmission" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "carbonIntensity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "carbonEmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carbonEmission_date_key" ON "carbonEmission"("date");
