-- DropIndex
DROP INDEX "Mark_question_type_id_key";

-- DropIndex
DROP INDEX "UserAnswer_question_id_key";

-- AlterTable
ALTER TABLE "Mark" ADD COLUMN     "quarter_id" INTEGER;

-- AlterTable
ALTER TABLE "UserAnswer" ADD COLUMN     "quarter_id" INTEGER;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "Quarter"("quarter_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "Quarter"("quarter_id") ON DELETE SET NULL ON UPDATE NO ACTION;
