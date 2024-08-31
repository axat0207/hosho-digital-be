/*
  Warnings:

  - A unique constraint covering the columns `[studentId]` on the table `ScholarshipApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipApplication_studentId_key" ON "ScholarshipApplication"("studentId");
