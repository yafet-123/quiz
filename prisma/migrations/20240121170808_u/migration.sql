-- CreateTable
CREATE TABLE "Mark" (
    "mark_id" SERIAL NOT NULL,
    "students_id" INTEGER NOT NULL,
    "subject_id" INTEGER,
    "question_type_id" INTEGER NOT NULL,
    "mark" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mark_pkey" PRIMARY KEY ("mark_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mark_question_type_id_key" ON "Mark"("question_type_id");

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_students_id_fkey" FOREIGN KEY ("students_id") REFERENCES "Students"("students_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_question_type_id_fkey" FOREIGN KEY ("question_type_id") REFERENCES "QuestionType"("question_type_id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Mark" ADD CONSTRAINT "Mark_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE SET NULL ON UPDATE NO ACTION;
