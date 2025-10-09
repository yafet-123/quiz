-- CreateTable
CREATE TABLE "QuestionType" (
    "question_type_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "question_category_id" INTEGER,
    "question_id" INTEGER,
    "questiontypeName" VARCHAR(255) NOT NULL,

    CONSTRAINT "QuestionType_pkey" PRIMARY KEY ("question_type_id")
);

-- CreateTable
CREATE TABLE "QuestionTypeQuestion" (
    "question_type_question_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "question_type_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionTypeQuestion_pkey" PRIMARY KEY ("question_type_question_id")
);

-- CreateTable
CREATE TABLE "_QuestionCategoryToQuestionType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_QuarterQuestionCategoryToQuestionType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionTypeToSubjectQuestionCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionCategoryToQuestionType_AB_unique" ON "_QuestionCategoryToQuestionType"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionCategoryToQuestionType_B_index" ON "_QuestionCategoryToQuestionType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuarterQuestionCategoryToQuestionType_AB_unique" ON "_QuarterQuestionCategoryToQuestionType"("A", "B");

-- CreateIndex
CREATE INDEX "_QuarterQuestionCategoryToQuestionType_B_index" ON "_QuarterQuestionCategoryToQuestionType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionTypeToSubjectQuestionCategory_AB_unique" ON "_QuestionTypeToSubjectQuestionCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionTypeToSubjectQuestionCategory_B_index" ON "_QuestionTypeToSubjectQuestionCategory"("B");

-- AddForeignKey
ALTER TABLE "QuestionType" ADD CONSTRAINT "QuestionType_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionTypeQuestion" ADD CONSTRAINT "QuestionTypeQuestion_question_type_id_fkey" FOREIGN KEY ("question_type_id") REFERENCES "QuestionType"("question_type_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTypeQuestion" ADD CONSTRAINT "QuestionTypeQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTypeQuestion" ADD CONSTRAINT "QuestionTypeQuestion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_QuestionCategoryToQuestionType" ADD CONSTRAINT "_QuestionCategoryToQuestionType_A_fkey" FOREIGN KEY ("A") REFERENCES "QuestionCategory"("question_category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionCategoryToQuestionType" ADD CONSTRAINT "_QuestionCategoryToQuestionType_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionType"("question_type_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuarterQuestionCategoryToQuestionType" ADD CONSTRAINT "_QuarterQuestionCategoryToQuestionType_A_fkey" FOREIGN KEY ("A") REFERENCES "QuarterQuestionCategory"("quarter_category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuarterQuestionCategoryToQuestionType" ADD CONSTRAINT "_QuarterQuestionCategoryToQuestionType_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionType"("question_type_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionTypeToSubjectQuestionCategory" ADD CONSTRAINT "_QuestionTypeToSubjectQuestionCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "QuestionType"("question_type_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionTypeToSubjectQuestionCategory" ADD CONSTRAINT "_QuestionTypeToSubjectQuestionCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SubjectQuestionCategory"("subject_category_id") ON DELETE CASCADE ON UPDATE CASCADE;
