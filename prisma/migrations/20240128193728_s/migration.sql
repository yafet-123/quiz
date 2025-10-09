-- CreateTable
CREATE TABLE "ClassQuestion" (
    "class_question_id" SERIAL NOT NULL,
    "teacher_id" INTEGER,
    "question_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassQuestion_pkey" PRIMARY KEY ("class_question_id")
);

-- AddForeignKey
ALTER TABLE "ClassQuestion" ADD CONSTRAINT "ClassQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("question_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassQuestion" ADD CONSTRAINT "ClassQuestion_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassQuestion" ADD CONSTRAINT "ClassQuestion_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("teacher_id") ON DELETE SET NULL ON UPDATE NO ACTION;
