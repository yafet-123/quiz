-- CreateTable
CREATE TABLE "SubjectQuestionCategory" (
    "subject_category_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "subject_id" INTEGER NOT NULL,
    "question_category_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubjectQuestionCategory_pkey" PRIMARY KEY ("subject_category_id")
);

-- AddForeignKey
ALTER TABLE "SubjectQuestionCategory" ADD CONSTRAINT "SubjectQuestionCategory_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectQuestionCategory" ADD CONSTRAINT "SubjectQuestionCategory_question_category_id_fkey" FOREIGN KEY ("question_category_id") REFERENCES "QuestionCategory"("question_category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectQuestionCategory" ADD CONSTRAINT "SubjectQuestionCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
