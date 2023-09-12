-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "district" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "totalDocks" INTEGER NOT NULL,
    "deploymentYear" INTEGER NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "member" BOOLEAN NOT NULL,
    "bikeId" INTEGER NOT NULL,

    CONSTRAINT "Ride_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bike" (
    "id" SERIAL NOT NULL,
    "bikeId" INTEGER NOT NULL,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StartingStation" (
    "rideId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "StartingStation_pkey" PRIMARY KEY ("rideId","stationId")
);

-- CreateTable
CREATE TABLE "EndingStation" (
    "rideId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,

    CONSTRAINT "EndingStation_pkey" PRIMARY KEY ("rideId","stationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_number_key" ON "Station"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Ride_startTime_key" ON "Ride"("startTime");

-- CreateIndex
CREATE UNIQUE INDEX "Bike_bikeId_key" ON "Bike"("bikeId");

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartingStation" ADD CONSTRAINT "StartingStation_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StartingStation" ADD CONSTRAINT "StartingStation_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndingStation" ADD CONSTRAINT "EndingStation_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EndingStation" ADD CONSTRAINT "EndingStation_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
