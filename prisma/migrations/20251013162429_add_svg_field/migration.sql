/*
  Warnings:

  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedDate` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `ModifiedDate` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `SubjectName` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Subject` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `CreatedDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ModifiedDate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Class` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassAnnouncement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassSubject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClassTeacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Communication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunicationRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quarter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuarterQuestionCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionTypeQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Students` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubjectQuestionCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuarterQuestionCategoryToQuestionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionCategoryToQuestionType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionTypeToSubjectQuestionCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modifiedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassAnnouncement" DROP CONSTRAINT "ClassAnnouncement_announcement_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassAnnouncement" DROP CONSTRAINT "ClassAnnouncement_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassQuestion" DROP CONSTRAINT "ClassQuestion_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassQuestion" DROP CONSTRAINT "ClassQuestion_question_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassQuestion" DROP CONSTRAINT "ClassQuestion_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSubject" DROP CONSTRAINT "ClassSubject_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSubject" DROP CONSTRAINT "ClassSubject_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassSubject" DROP CONSTRAINT "ClassSubject_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_class_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "ClassTeacher" DROP CONSTRAINT "ClassTeacher_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationRelation" DROP CONSTRAINT "CommunicationRelation_class_id_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationRelation" DROP CONSTRAINT "CommunicationRelation_communication_id_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationRelation" DROP CONSTRAINT "CommunicationRelation_students_id_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationRelation" DROP CONSTRAINT "CommunicationRelation_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "CommunicationRelation" DROP CONSTRAINT "CommunicationRelation_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_quarter_id_fkey";

-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_question_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_students_id_fkey";

-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Quarter" DROP CONSTRAINT "Quarter_user_id_fkey";

-- DropForeignKey
ALTER TABLE "QuarterQuestionCategory" DROP CONSTRAINT "QuarterQuestionCategory_quarter_id_fkey";

-- DropForeignKey
ALTER TABLE "QuarterQuestionCategory" DROP CONSTRAINT "QuarterQuestionCategory_question_category_id_fkey";

-- DropForeignKey
ALTER TABLE "QuarterQuestionCategory" DROP CONSTRAINT "QuarterQuestionCategory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_question_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_teacher_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionCategory" DROP CONSTRAINT "QuestionCategory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionType" DROP CONSTRAINT "QuestionType_user_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionTypeQuestion" DROP CONSTRAINT "QuestionTypeQuestion_question_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionTypeQuestion" DROP CONSTRAINT "QuestionTypeQuestion_question_type_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionTypeQuestion" DROP CONSTRAINT "QuestionTypeQuestion_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_class_id_fkey";

-- DropForeignKey
ALTER TABLE "Students" DROP CONSTRAINT "Students_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_user_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectQuestionCategory" DROP CONSTRAINT "SubjectQuestionCategory_question_category_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectQuestionCategory" DROP CONSTRAINT "SubjectQuestionCategory_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "SubjectQuestionCategory" DROP CONSTRAINT "SubjectQuestionCategory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_students_id_fkey";

-- DropForeignKey
ALTER TABLE "Teacher" DROP CONSTRAINT "Teacher_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_quarter_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_question_type_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_students_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "_QuarterQuestionCategoryToQuestionType" DROP CONSTRAINT "_QuarterQuestionCategoryToQuestionType_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuarterQuestionCategoryToQuestionType" DROP CONSTRAINT "_QuarterQuestionCategoryToQuestionType_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionCategoryToQuestionType" DROP CONSTRAINT "_QuestionCategoryToQuestionType_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionCategoryToQuestionType" DROP CONSTRAINT "_QuestionCategoryToQuestionType_B_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionTypeToSubjectQuestionCategory" DROP CONSTRAINT "_QuestionTypeToSubjectQuestionCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuestionTypeToSubjectQuestionCategory" DROP CONSTRAINT "_QuestionTypeToSubjectQuestionCategory_B_fkey";

-- DropIndex
DROP INDEX "User_UserName_key";

-- DropIndex
DROP INDEX "User_resetToken_key";

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
DROP COLUMN "CreatedDate",
DROP COLUMN "ModifiedDate",
DROP COLUMN "SubjectName",
DROP COLUMN "subject_id",
DROP COLUMN "user_id",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "svg" TEXT,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "CreatedDate",
DROP COLUMN "ModifiedDate",
DROP COLUMN "Password",
DROP COLUMN "UserName",
DROP COLUMN "resetToken",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'student',
ALTER COLUMN "role" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Class";

-- DropTable
DROP TABLE "ClassAnnouncement";

-- DropTable
DROP TABLE "ClassQuestion";

-- DropTable
DROP TABLE "ClassSubject";

-- DropTable
DROP TABLE "ClassTeacher";

-- DropTable
DROP TABLE "Communication";

-- DropTable
DROP TABLE "CommunicationRelation";

-- DropTable
DROP TABLE "Mark";

-- DropTable
DROP TABLE "Quarter";

-- DropTable
DROP TABLE "QuarterQuestionCategory";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "QuestionCategory";

-- DropTable
DROP TABLE "QuestionType";

-- DropTable
DROP TABLE "QuestionTypeQuestion";

-- DropTable
DROP TABLE "Students";

-- DropTable
DROP TABLE "SubjectQuestionCategory";

-- DropTable
DROP TABLE "Task";

-- DropTable
DROP TABLE "Teacher";

-- DropTable
DROP TABLE "UserAnswer";

-- DropTable
DROP TABLE "_QuarterQuestionCategoryToQuestionType";

-- DropTable
DROP TABLE "_QuestionCategoryToQuestionType";

-- DropTable
DROP TABLE "_QuestionTypeToSubjectQuestionCategory";

-- CreateTable
CREATE TABLE "Exam" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "fileUrl" TEXT,
    "subjectId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "fileUrl" TEXT,
    "examId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "contentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExamTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ContentTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamTags_AB_unique" ON "_ExamTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamTags_B_index" ON "_ExamTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContentTags_AB_unique" ON "_ContentTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ContentTags_B_index" ON "_ContentTags"("B");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamTags" ADD CONSTRAINT "_ExamTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamTags" ADD CONSTRAINT "_ExamTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentTags" ADD CONSTRAINT "_ContentTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
