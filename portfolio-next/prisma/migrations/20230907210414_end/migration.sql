/*
  Warnings:

  - You are about to drop the column `endedTime` on the `Ride` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ride" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "member" BOOLEAN NOT NULL
);
INSERT INTO "new_Ride" ("id", "member", "startTime") SELECT "id", "member", "startTime" FROM "Ride";
DROP TABLE "Ride";
ALTER TABLE "new_Ride" RENAME TO "Ride";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
