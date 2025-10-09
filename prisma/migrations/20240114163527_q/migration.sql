-- CreateTable
CREATE TABLE "UserAnswer" (
    "user_answer_id" SERIAL NOT NULL,
    "students_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "question_type_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "user_answer" TEXT NOT NULL,
    "points" INTEGER,
    "CreatedDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("user_answer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_question_id_key" ON "UserAnswer"("question_id");

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_students_id_fkey" FOREIGN KEY ("students_id") REFERENCES "Students"("students_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_question_type_id_fkey" FOREIGN KEY ("question_type_id") REFERENCES "QuestionType"("question_type_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE NO ACTION;
