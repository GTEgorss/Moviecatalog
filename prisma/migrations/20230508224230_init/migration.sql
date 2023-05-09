/*
  Warnings:

  - You are about to drop the column `externalId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "externalId";

-- CreateTable
CREATE TABLE "UserIdToExternalId" (
    "userId" INTEGER NOT NULL,
    "externalId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserIdToExternalId_userId_externalId_key" ON "UserIdToExternalId"("userId", "externalId");

-- AddForeignKey
ALTER TABLE "UserIdToExternalId" ADD CONSTRAINT "UserIdToExternalId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
