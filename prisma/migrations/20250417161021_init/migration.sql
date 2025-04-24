-- CreateTable
CREATE TABLE "Home_intro" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "mainHeading" TEXT NOT NULL,
    "subHeading" TEXT NOT NULL,

    CONSTRAINT "Home_intro_pkey" PRIMARY KEY ("id")
);
