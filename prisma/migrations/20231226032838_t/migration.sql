/*
  Warnings:

  - You are about to drop the `ClassSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionStudents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SectionTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClassSection" DROP CONSTRAINT "ClassSection_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSection" DROP CONSTRAINT "ClassSection_section_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSection" DROP CONSTRAINT "ClassSection_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SectionStudents" DROP CONSTRAINT "SectionStudents_section_id_fkey";

-- DropForeignKey
ALTER TABLE "SectionStudents" DROP CONSTRAINT "SectionStudents_students_id_fkey";

-- DropForeignKey
ALTER TABLE "SectionStudents" DROP CONSTRAINT "SectionStudents_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SectionTeacher" DROP CONSTRAINT "SectionTeacher_section_id_fkey";

-- DropForeignKey
ALTER TABLE "SectionTeacher" DROP CONSTRAINT "SectionTeacher_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "SectionTeacher" DROP CONSTRAINT "SectionTeacher_user_id_fkey";

-- DropTable
DROP TABLE "ClassSection";

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "SectionStudents";

-- DropTable
DROP TABLE "SectionTeacher";

-- CreateTable
CREATE TABLE "ClassStudents" (
    "student_class_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "class_id" INTEGER NOT NULL,
    "students_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassStudents_pkey" PRIMARY KEY ("student_class_id")
);

-- CreateTable
CREATE TABLE "ClassTeacher" (
    "teacher_class_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "class_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassTeacher_pkey" PRIMARY KEY ("teacher_class_id")
);

-- AddForeignKey
ALTER TABLE "ClassStudents" ADD CONSTRAINT "ClassStudents_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudents" ADD CONSTRAINT "ClassStudents_students_id_fkey" FOREIGN KEY ("students_id") REFERENCES "Students"("students_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassStudents" ADD CONSTRAINT "ClassStudents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassTeacher" ADD CONSTRAINT "ClassTeacher_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
