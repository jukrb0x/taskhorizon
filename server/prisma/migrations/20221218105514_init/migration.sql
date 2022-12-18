/*
  Warnings:

  - You are about to drop the `_EventToTodo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToTodo" DROP CONSTRAINT "_EventToTodo_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToTodo" DROP CONSTRAINT "_EventToTodo_B_fkey";

-- DropTable
DROP TABLE "_EventToTodo";

-- CreateTable
CREATE TABLE "_LinkedEvents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LinkedEvents_AB_unique" ON "_LinkedEvents"("A", "B");

-- CreateIndex
CREATE INDEX "_LinkedEvents_B_index" ON "_LinkedEvents"("B");

-- AddForeignKey
ALTER TABLE "_LinkedEvents" ADD CONSTRAINT "_LinkedEvents_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LinkedEvents" ADD CONSTRAINT "_LinkedEvents_B_fkey" FOREIGN KEY ("B") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
