/*
  Warnings:

  - Made the column `userId` on table `WatchLaterMovie` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "WatchLaterMovie" DROP CONSTRAINT "WatchLaterMovie_userId_fkey";

-- AlterTable
ALTER TABLE "WatchLaterMovie" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "WatchLaterMovie" ADD CONSTRAINT "WatchLaterMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
