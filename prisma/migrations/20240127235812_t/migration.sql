-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "question_type_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_question_type_id_fkey" FOREIGN KEY ("question_type_id") REFERENCES "QuestionType"("question_type_id") ON DELETE SET NULL ON UPDATE NO ACTION;
