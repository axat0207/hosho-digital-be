-- DropForeignKey
ALTER TABLE "ScholarshipApplication" DROP CONSTRAINT "ScholarshipApplication_studentId_fkey";

-- AlterTable
ALTER TABLE "ScholarshipApplication" ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ScholarshipApplication" ADD CONSTRAINT "ScholarshipApplication_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
