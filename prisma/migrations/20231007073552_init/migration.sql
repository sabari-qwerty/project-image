-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "role" TEXT,
    "upload_count" INTEGER,
    "picture" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "image_url" TEXT,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);
