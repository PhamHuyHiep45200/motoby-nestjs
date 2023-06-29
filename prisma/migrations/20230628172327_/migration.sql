/*
  Warnings:

  - Added the required column `depositPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `giveCarAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlates` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "depositPrice" INTEGER NOT NULL,
ADD COLUMN     "giveCarAddress" TEXT NOT NULL,
ADD COLUMN     "licensePlates" TEXT NOT NULL;
