-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('STUDENT', 'HOD', 'PRINCIPAL', 'FINANCE_HEAD');

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "roleType" "RoleType" NOT NULL,
    "clerkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipApplication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "aadharCard" TEXT,
    "marksheet" TEXT,
    "incomeCertificate" TEXT,
    "approvedByHod" BOOLEAN NOT NULL DEFAULT false,
    "approvedByFinanceHead" BOOLEAN NOT NULL DEFAULT false,
    "approvedByPrincipal" BOOLEAN NOT NULL DEFAULT false,
    "feedback" TEXT,
    "amountSanction" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "ScholarshipApplication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScholarshipApplication" ADD CONSTRAINT "ScholarshipApplication_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
