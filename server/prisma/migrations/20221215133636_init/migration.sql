/*
  Warnings:

  - You are about to drop the column `Order` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "Order",
ADD COLUMN     "order" INTEGER;
