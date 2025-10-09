/*
  Warnings:

  - A unique constraint covering the columns `[firstName]` on the table `Students` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lastName]` on the table `Students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "firstName" VARCHAR(255),
ADD COLUMN     "lastName" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Students_firstName_key" ON "Students"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "Students_lastName_key" ON "Students"("lastName");
