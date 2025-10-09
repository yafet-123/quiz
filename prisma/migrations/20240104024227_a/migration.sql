-- CreateTable
CREATE TABLE "Students" (
    "students_id" SERIAL NOT NULL,
    "UserName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "resetToken" VARCHAR(255),
    "Password" VARCHAR(255) NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "class_id" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("students_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Students_UserName_key" ON "Students"("UserName");

-- CreateIndex
CREATE UNIQUE INDEX "Students_email_key" ON "Students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Students_resetToken_key" ON "Students"("resetToken");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE NO ACTION;
