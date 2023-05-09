-- CreateTable
CREATE TABLE "MovieTimesOpened" (
    "movieId" INTEGER NOT NULL,
    "timeOpened" INTEGER NOT NULL,

    CONSTRAINT "MovieTimesOpened_pkey" PRIMARY KEY ("movieId")
);

-- AddForeignKey
ALTER TABLE "MovieTimesOpened" ADD CONSTRAINT "MovieTimesOpened_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
