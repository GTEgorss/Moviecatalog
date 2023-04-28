/*
  Warnings:

  - The primary key for the `MovieToPlaylist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[playlistId,movieId]` on the table `MovieToPlaylist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MovieToPlaylist" DROP CONSTRAINT "MovieToPlaylist_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "MovieToPlaylist_playlistId_movieId_key" ON "MovieToPlaylist"("playlistId", "movieId");
