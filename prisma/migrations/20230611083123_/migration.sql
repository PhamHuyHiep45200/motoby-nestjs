/*
  Warnings:

  - The values [CONFIRM,RENTING] on the enum `StatusOrder` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusOrder_new" AS ENUM ('INPROGRESS', 'CANCLE', 'RECEIVED', 'PAID');
ALTER TABLE "Order" ALTER COLUMN "statusOrder" TYPE "StatusOrder_new" USING ("statusOrder"::text::"StatusOrder_new");
ALTER TYPE "StatusOrder" RENAME TO "StatusOrder_old";
ALTER TYPE "StatusOrder_new" RENAME TO "StatusOrder";
DROP TYPE "StatusOrder_old";
COMMIT;
