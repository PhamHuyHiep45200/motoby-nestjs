/*
  Warnings:

  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `star` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_idUserComment_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_motoId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "star" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Comment";

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "idPersonSend" INTEGER NOT NULL,
    "idPersonRecipient" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "deleteFlg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_idPersonSend_fkey" FOREIGN KEY ("idPersonSend") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_idPersonRecipient_fkey" FOREIGN KEY ("idPersonRecipient") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
