-- CreateTable
CREATE TABLE "Contact_info" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icons1" TEXT NOT NULL,
    "href1" TEXT NOT NULL,
    "icons2" TEXT NOT NULL,
    "phone1" TEXT NOT NULL,
    "phone2" TEXT NOT NULL,
    "icons3" TEXT NOT NULL,
    "mail1" TEXT NOT NULL,
    "mail2" TEXT NOT NULL,

    CONSTRAINT "Contact_info_pkey" PRIMARY KEY ("id")
);
