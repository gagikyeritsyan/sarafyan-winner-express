-- CreateTable
CREATE TABLE "Contact_message" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "input_name_placeholder" TEXT NOT NULL,
    "input_last_name_placeholder" TEXT NOT NULL,
    "input_email_placeholder" TEXT NOT NULL,
    "input_tel_placeholder" TEXT NOT NULL,
    "textarea_placeholder" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,

    CONSTRAINT "Contact_message_pkey" PRIMARY KEY ("id")
);
