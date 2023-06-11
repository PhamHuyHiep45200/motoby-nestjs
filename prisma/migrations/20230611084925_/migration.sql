/*
  Warnings:

  - You are about to drop the column `idUserDeliveryMan` on the `Order` table. All the data in the column will be lost.
  - Added the required column `receivingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_idUserDeliveryMan_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "idUserDeliveryMan",
ADD COLUMN     "receivingAddress" TIMESTAMP(3) NOT NULL;
