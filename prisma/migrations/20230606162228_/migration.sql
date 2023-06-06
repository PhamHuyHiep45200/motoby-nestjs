/*
  Warnings:

  - You are about to drop the column `idCategory` on the `Moto` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Moto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Moto" DROP CONSTRAINT "Moto_idCategory_fkey";

-- AlterTable
ALTER TABLE "Moto" DROP COLUMN "idCategory",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Moto" ADD CONSTRAINT "Moto_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
