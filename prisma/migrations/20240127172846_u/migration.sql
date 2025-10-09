/*
  Warnings:

  - You are about to drop the column `user_id` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_user_id_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "user_id",
ADD COLUMN     "teacher_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("teacher_id") ON DELETE SET NULL ON UPDATE NO ACTION;
