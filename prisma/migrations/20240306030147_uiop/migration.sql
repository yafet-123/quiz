-- AlterTable
ALTER TABLE "CommunicationRelation" ALTER COLUMN "class_id" DROP NOT NULL,
ALTER COLUMN "teacher_id" DROP NOT NULL,
ALTER COLUMN "subject_id" DROP NOT NULL,
ALTER COLUMN "students_id" DROP NOT NULL,
ALTER COLUMN "communication_id" DROP NOT NULL;
