-- CreateTable
CREATE TABLE "Students" (
    "students_id" SERIAL NOT NULL,
    "UserName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "resetToken" VARCHAR(255),
    "Password" VARCHAR(255) NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("students_id")
);

-- CreateTable
CREATE TABLE "Quarter" (
    "quarter_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "quarterName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Quarter_pkey" PRIMARY KEY ("quarter_id")
);

-- CreateTable
CREATE TABLE "QuarterQuestionCategory" (
    "quarter_category_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "quarter_id" INTEGER NOT NULL,
    "question_category_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuarterQuestionCategory_pkey" PRIMARY KEY ("quarter_category_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_UserName_key" ON "Students"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_resetToken_key" ON "Students"("resetToken");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quarter" ADD CONSTRAINT "Quarter_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuarterQuestionCategory" ADD CONSTRAINT "QuarterQuestionCategory_quarter_id_fkey" FOREIGN KEY ("quarter_id") REFERENCES "Quarter"("quarter_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuarterQuestionCategory" ADD CONSTRAINT "QuarterQuestionCategory_question_category_id_fkey" FOREIGN KEY ("question_category_id") REFERENCES "QuestionCategory"("question_category_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuarterQuestionCategory" ADD CONSTRAINT "QuarterQuestionCategory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
