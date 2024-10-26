-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CAPS', 'T_SHIRTS');

-- CreateTable
CREATE TABLE "Product" (
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("uuid")
);
