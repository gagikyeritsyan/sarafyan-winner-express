-- CreateTable
CREATE TABLE "Footer" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "background_img" TEXT NOT NULL,
    "logo_img" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT NOT NULL,

    CONSTRAINT "Footer_pkey" PRIMARY KEY ("id")
);
