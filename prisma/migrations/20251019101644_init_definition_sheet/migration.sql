-- CreateTable
CREATE TABLE "DefinitionSheet" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "subjectId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DefinitionSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Definition" (
    "id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "example" TEXT,
    "sheetId" INTEGER NOT NULL,

    CONSTRAINT "Definition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DefinitionSheet" ADD CONSTRAINT "DefinitionSheet_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DefinitionSheet" ADD CONSTRAINT "DefinitionSheet_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Definition" ADD CONSTRAINT "Definition_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "DefinitionSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
