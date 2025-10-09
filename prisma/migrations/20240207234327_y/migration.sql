/*
  Warnings:

  - Made the column `quarter_id` on table `Mark` required. This step will fail if there are existing NULL values in that column.
  - Made the column `quarter_id` on table `UserAnswer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Mark" DROP CONSTRAINT "Mark_quarter_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_quarter_id_fkey";

-- AlterTable
ALTER TABLE "Mark" ALTER COLUMN "quarter_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserAnswer" ALTER COLUMN "quarter_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "Quarter"("quarter_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "Quarter"("quarter_id") ON DELETE RESTRICT ON UPDATE NO ACTION;
