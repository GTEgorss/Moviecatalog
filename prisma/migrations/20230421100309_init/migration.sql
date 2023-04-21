/*
  Warnings:

  - You are about to drop the `_MovieToPlaylist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MovieToPlaylist" DROP CONSTRAINT "_MovieToPlaylist_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToPlaylist" DROP CONSTRAINT "_MovieToPlaylist_B_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_B_fkey";

-- DropTable
DROP TABLE "_MovieToPlaylist";

-- DropTable
DROP TABLE "_MovieToUser";

-- CreateTable
CREATE TABLE "MovieToPlaylist" (
    "movieId" INTEGER NOT NULL,
    "playlistId" INTEGER NOT NULL,

    CONSTRAINT "MovieToPlaylist_pkey" PRIMARY KEY ("movieId","playlistId")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieToPlaylist" ADD CONSTRAINT "MovieToPlaylist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieToPlaylist" ADD CONSTRAINT "MovieToPlaylist_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
