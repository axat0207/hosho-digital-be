/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `studentId` on table `ScholarshipApplication` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ScholarshipApplication" DROP CONSTRAINT "ScholarshipApplication_studentId_fkey";

-- AlterTable
ALTER TABLE "ScholarshipApplication" ALTER COLUMN "studentId" SET NOT NULL;

-- DropTable
DROP TABLE "Role";

-- DropEnum
DROP TYPE "RoleType";
