-- DropForeignKey
ALTER TABLE "ExamOption" DROP CONSTRAINT "ExamOption_examQuestionId_fkey";

-- AddForeignKey
ALTER TABLE "ExamOption" ADD CONSTRAINT "ExamOption_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "ExamQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
