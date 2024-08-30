/*
  Warnings:

  - You are about to drop the column `feedback` on the `ScholarshipApplication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rollNo]` on the table `ScholarshipApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ScholarshipApplication" DROP COLUMN "feedback",
ADD COLUMN     "hodFeedback" TEXT,
ADD COLUMN     "principalFeedback" TEXT;

-- CreateTable
CREATE TABLE "Notification" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT,
    "message" TEXT NOT NULL,
    "isAdmin" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipApplication_rollNo_key" ON "ScholarshipApplication"("rollNo");
