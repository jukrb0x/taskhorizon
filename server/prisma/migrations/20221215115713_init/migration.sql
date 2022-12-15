/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `TodoCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `TodoCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "categoryId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "TodoCategory" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TodoCategory_uuid_key" ON "TodoCategory"("uuid");
