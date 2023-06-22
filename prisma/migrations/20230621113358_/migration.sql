-- CreateTable
CREATE TABLE "Notify" (
    "id" SERIAL NOT NULL,
    "rentalStartDate" TIMESTAMP(3) NOT NULL,
    "leaseEndDate" TIMESTAMP(3) NOT NULL,
    "receivingAddress" TEXT NOT NULL,
    "statusOrder" "StatusOrder" NOT NULL,
    "allMoney" INTEGER NOT NULL,
    "idMoto" INTEGER NOT NULL,
    "idUserReceiver" INTEGER NOT NULL,
    "star" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "deleteFlg" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Notify_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notify" ADD CONSTRAINT "Notify_idUserReceiver_fkey" FOREIGN KEY ("idUserReceiver") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notify" ADD CONSTRAINT "Notify_idMoto_fkey" FOREIGN KEY ("idMoto") REFERENCES "Moto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
