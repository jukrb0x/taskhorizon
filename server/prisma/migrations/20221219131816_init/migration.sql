/*
  Warnings:

  - You are about to drop the `_LinkedEvents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LinkedEvents" DROP CONSTRAINT "_LinkedEvents_A_fkey";

-- DropForeignKey
ALTER TABLE "_LinkedEvents" DROP CONSTRAINT "_LinkedEvents_B_fkey";

-- DropTable
DROP TABLE "_LinkedEvents";

-- CreateTable
CREATE TABLE "_EventToTodo" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EventToTodo_AB_unique" ON "_EventToTodo"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToTodo_B_index" ON "_EventToTodo"("B");

-- AddForeignKey
ALTER TABLE "_EventToTodo" ADD CONSTRAINT "_EventToTodo_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToTodo" ADD CONSTRAINT "_EventToTodo_B_fkey" FOREIGN KEY ("B") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
