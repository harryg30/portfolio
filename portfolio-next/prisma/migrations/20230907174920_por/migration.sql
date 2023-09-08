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
    "deploymentYear" INTEGER NOT NULL,
    "partOfRide" TEXT NOT NULL DEFAULT 'no'
);
INSERT INTO "new_Station" ("deploymentYear", "district", "id", "latitude", "longitude", "name", "number", "partOfRide", "public", "totalDocks") SELECT "deploymentYear", "district", "id", "latitude", "longitude", "name", "number", "partOfRide", "public", "totalDocks" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
