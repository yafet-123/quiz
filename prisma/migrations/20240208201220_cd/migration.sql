-- CreateTable
CREATE TABLE "Announcement" (
    "announcement_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("announcement_id")
);

-- CreateTable
CREATE TABLE "ClassAnnouncement" (
    "class_announcement_id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "announcement_id" INTEGER NOT NULL,
    "CreatedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "ModifiedDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClassAnnouncement_pkey" PRIMARY KEY ("class_announcement_id")
);

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teacher"("teacher_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassAnnouncement" ADD CONSTRAINT "ClassAnnouncement_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassAnnouncement" ADD CONSTRAINT "ClassAnnouncement_announcement_id_fkey" FOREIGN KEY ("announcement_id") REFERENCES "Announcement"("announcement_id") ON DELETE RESTRICT ON UPDATE CASCADE;
