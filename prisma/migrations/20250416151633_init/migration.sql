-- CreateTable
CREATE TABLE "Header_navbar" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Header_navbar_pkey" PRIMARY KEY ("id")
);
