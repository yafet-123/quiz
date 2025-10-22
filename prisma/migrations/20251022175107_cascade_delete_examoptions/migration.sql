-- DropForeignKey
ALTER TABLE "WorksheetOption" DROP CONSTRAINT "WorksheetOption_worksheetQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "WorksheetQuestion" DROP CONSTRAINT "WorksheetQuestion_worksheetId_fkey";

-- AddForeignKey
ALTER TABLE "WorksheetQuestion" ADD CONSTRAINT "WorksheetQuestion_worksheetId_fkey" FOREIGN KEY ("worksheetId") REFERENCES "Worksheet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorksheetOption" ADD CONSTRAINT "WorksheetOption_worksheetQuestionId_fkey" FOREIGN KEY ("worksheetQuestionId") REFERENCES "WorksheetQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
