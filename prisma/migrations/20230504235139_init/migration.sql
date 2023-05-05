/*
  Warnings:

  - Added the required column `movieTitle` to the `MovieToPlaylist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieToPlaylist" ADD COLUMN     "movieTitle" TEXT NOT NULL;
