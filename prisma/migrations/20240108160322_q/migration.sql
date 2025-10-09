/*
  Warnings:

  - Added the required column `subject_id` to the `ClassTeacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClassTeacher" ADD COLUMN     "subject_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;
