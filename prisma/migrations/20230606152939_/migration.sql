/*
  Warnings:

  - You are about to drop the column `status` on the `Moto` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Moto" DROP COLUMN "status",
ADD COLUMN     "quantity" INTEGER NOT NULL;
