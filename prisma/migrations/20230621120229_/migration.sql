/*
  Warnings:

  - Added the required column `idCard` to the `Notify` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCard` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notify" ADD COLUMN     "idCard" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "idCard" TEXT NOT NULL;
