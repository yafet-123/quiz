-- DropForeignKey
ALTER TABLE "FormulaSheet" DROP CONSTRAINT "FormulaSheet_topicId_fkey";

-- AddForeignKey
ALTER TABLE "FormulaSheet" ADD CONSTRAINT "FormulaSheet_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
