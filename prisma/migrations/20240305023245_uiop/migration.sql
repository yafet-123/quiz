-- CreateTable
CREATE TABLE "Communication" (
    "communication_id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "content" VARCHAR(255),
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Communication_pkey" PRIMARY KEY ("communication_id")
);

-- CreateTable
CREATE TABLE "CommunicationRelation" (
    "communication_relation_id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "students_id" INTEGER NOT NULL,
    "communication_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommunicationRelation_pkey" PRIMARY KEY ("communication_relation_id")
);

-- AddForeignKey
ALTER TABLE "CommunicationRelation" ADD CONSTRAINT "CommunicationRelation_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationRelation" ADD CONSTRAINT "CommunicationRelation_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationRelation" ADD CONSTRAINT "CommunicationRelation_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationRelation" ADD CONSTRAINT "CommunicationRelation_students_id_fkey" FOREIGN KEY ("students_id") REFERENCES "Students"("students_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationRelation" ADD CONSTRAINT "CommunicationRelation_communication_id_fkey" FOREIGN KEY ("communication_id") REFERENCES "Communication"("communication_id") ON DELETE CASCADE ON UPDATE CASCADE;
