/*
  Warnings:

  - Added the required column `allMoney` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "allMoney" INTEGER NOT NULL,
ALTER COLUMN "receivingAddress" SET DATA TYPE TEXT;
