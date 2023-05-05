/*
  Warnings:

  - Added the required column `movieTitle` to the `WatchLaterMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WatchLaterMovie" ADD COLUMN     "movieTitle" TEXT NOT NULL;
