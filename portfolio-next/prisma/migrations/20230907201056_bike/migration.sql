/*
  Warnings:

  - You are about to drop the `StationOnRide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `partOfRide` on the `Station` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StationOnRide";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Bike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bikeId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "StartingStation" (
    "rideId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,

    PRIMARY KEY ("rideId", "stationId"),
    CONSTRAINT "StartingStation_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StartingStation_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EndingStation" (
    "rideId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,

    PRIMARY KEY ("rideId", "stationId"),
    CONSTRAINT "EndingStation_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EndingStation_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "BikeOnRide" (
    "rideId" INTEGER NOT NULL,
    "bikeId" INTEGER NOT NULL,

    PRIMARY KEY ("rideId", "bikeId"),
    CONSTRAINT "BikeOnRide_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BikeOnRide_bikeId_fkey" FOREIGN KEY ("bikeId") REFERENCES "Bike" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "district" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "totalDocks" INTEGER NOT NULL,
    "deploymentYear" INTEGER NOT NULL
);
INSERT INTO "new_Station" ("deploymentYear", "district", "id", "latitude", "longitude", "name", "number", "public", "totalDocks") SELECT "deploymentYear", "district", "id", "latitude", "longitude", "name", "number", "public", "totalDocks" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
CREATE UNIQUE INDEX "Station_number_key" ON "Station"("number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
