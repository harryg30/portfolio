/*
  Warnings:

  - You are about to drop the column `rideId` on the `Ride` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" TEXT NOT NULL,
    "endedTime" TEXT NOT NULL,
    "member" BOOLEAN NOT NULL
);
INSERT INTO "new_Ride" ("endedTime", "id", "member", "startTime") SELECT "endedTime", "id", "member", "startTime" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
