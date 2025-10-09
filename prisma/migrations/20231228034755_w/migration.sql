/*
  Warnings:

  - You are about to drop the `ClassStudents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassStudents" DROP CONSTRAINT "ClassStudents_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassStudents" DROP CONSTRAINT "ClassStudents_students_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassStudents" DROP CONSTRAINT "ClassStudents_user_id_fkey";

-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "class_id" INTEGER;

-- DropTable
DROP TABLE "ClassStudents";

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE SET NULL ON UPDATE NO ACTION;
