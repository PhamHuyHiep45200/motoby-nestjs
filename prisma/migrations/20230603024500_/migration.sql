-- CreateEnum
CREATE TYPE "StatusMoto" AS ENUM ('AVAILABLE', 'HIRED', 'MAINTAIN');

-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('CONFIRM', 'RENTING', 'PAID');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "deleteFlg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Moto" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "yearOfManufacture" TIMESTAMP(3) NOT NULL,
    "producer" TEXT NOT NULL,
    "listThumbnail" TEXT[],
    "color" TEXT NOT NULL,
    "licensePates" TEXT NOT NULL,
    "rentCost" INTEGER NOT NULL,
    "status" "StatusMoto" NOT NULL,
    "idCategory" INTEGER NOT NULL,
    "deleteFlg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "rentalStartDate" TIMESTAMP(3) NOT NULL,
    "leaseEndDate" TIMESTAMP(3) NOT NULL,
    "statusOrder" "StatusOrder" NOT NULL,
    "idMoto" INTEGER NOT NULL,
    "idUserReceiver" INTEGER NOT NULL,
    "idUserDeliveryMan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "motoId" INTEGER NOT NULL,
    "idUserComment" INTEGER NOT NULL,
    "contentComment" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "deleteFlg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "deleteFlg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" SERIAL NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "deleteFlg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Moto" ADD CONSTRAINT "Moto_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idUserReceiver_fkey" FOREIGN KEY ("idUserReceiver") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idUserDeliveryMan_fkey" FOREIGN KEY ("idUserDeliveryMan") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_idMoto_fkey" FOREIGN KEY ("idMoto") REFERENCES "Moto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_idUserComment_fkey" FOREIGN KEY ("idUserComment") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_motoId_fkey" FOREIGN KEY ("motoId") REFERENCES "Moto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
