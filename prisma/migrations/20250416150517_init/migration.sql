/*
  Warnings:

  - You are about to drop the `header_main_logo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "header_main_logo";

-- CreateTable
CREATE TABLE "Header_main_logo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "img_url" TEXT NOT NULL,

    CONSTRAINT "Header_main_logo_pkey" PRIMARY KEY ("id")
);
