/*
  Warnings:

  - A unique constraint covering the columns `[startTime]` on the table `Ride` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ride_startTime_key" ON "Ride"("startTime");
