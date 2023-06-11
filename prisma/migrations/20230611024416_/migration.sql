/*
  Warnings:

  - Added the required column `thumnail` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "thumnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Moto" ADD COLUMN     "description" TEXT NOT NULL;
