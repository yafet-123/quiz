-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "subject_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE SET NULL ON UPDATE NO ACTION;
