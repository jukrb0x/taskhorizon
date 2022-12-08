/*
  Warnings:

  - You are about to drop the column `createdTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `createdTime` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedTime` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdTime",
DROP COLUMN "updatedTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "createdTime",
DROP COLUMN "updatedTime",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
