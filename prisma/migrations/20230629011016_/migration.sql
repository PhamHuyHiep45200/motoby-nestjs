/*
  Warnings:

  - You are about to drop the column `licensePlates` on the `Order` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Moto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlates` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moto" ADD COLUMN     "discount" INTEGER NOT NULL,
ADD COLUMN     "licensePlates" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "licensePlates";
