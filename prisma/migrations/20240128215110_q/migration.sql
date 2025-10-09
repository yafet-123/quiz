/*
  Warnings:

  - You are about to drop the column `question_category_id` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_question_category_id_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "question_category_id";
