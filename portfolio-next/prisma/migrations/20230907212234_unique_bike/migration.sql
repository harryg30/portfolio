/*
  Warnings:

  - A unique constraint covering the columns `[bikeId]` on the table `Bike` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bike_bikeId_key" ON "Bike"("bikeId");
