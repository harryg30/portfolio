-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "district" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,
    "totalDocks" INTEGER NOT NULL,
    "deploymentYear" INTEGER NOT NULL,
    "partOfRide" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rideId" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endedTime" TEXT NOT NULL,
    "member" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "StationOnRide" (
    "rideId" INTEGER NOT NULL,
    "stationId" INTEGER NOT NULL,
    "wasStart" BOOLEAN NOT NULL,

    PRIMARY KEY ("rideId", "stationId"),
    CONSTRAINT "StationOnRide_rideId_fkey" FOREIGN KEY ("rideId") REFERENCES "Ride" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "StationOnRide_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
