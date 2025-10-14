/*
  Warnings:

  - You are about to drop the column `approved` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ContentTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExamTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_contentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_examId_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentTags" DROP CONSTRAINT "_ContentTags_B_fkey";

-- DropForeignKey
ALTER TABLE "_ExamTags" DROP CONSTRAINT "_ExamTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExamTags" DROP CONSTRAINT "_ExamTags_B_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "approved",
DROP COLUMN "fileUrl",
DROP COLUMN "type",
DROP COLUMN "year";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ContentTags";

-- DropTable
DROP TABLE "_ExamTags";

-- CreateTable
CREATE TABLE "ExamQuestion" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "examId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamOption" (
    "id" SERIAL NOT NULL,
    "optionText" TEXT NOT NULL,
    "examQuestionId" INTEGER NOT NULL,

    CONSTRAINT "ExamOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamOption" ADD CONSTRAINT "ExamOption_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "ExamQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
