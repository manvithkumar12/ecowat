/*
  Warnings:

  - A unique constraint covering the columns `[userDataId,name]` on the table `Appliance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appliance_userDataId_name_key" ON "Appliance"("userDataId", "name");
