-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('TRAINEE', 'JUNIOR', 'MID', 'SENIOR');

-- CreateEnum
CREATE TYPE "RemoteOption" AS ENUM ('REMOTE', 'ONSITE', 'HYBRID');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('CONTRACT', 'PERMANENT');

-- CreateEnum
CREATE TYPE "Skill" AS ENUM ('JAVASCRIPT', 'PYTHON', 'JAVA', 'CPP', 'RUBY', 'PHP', 'HTML', 'CSS', 'SQL', 'REACT', 'ANGULAR', 'NODEJS', 'CSHARP', 'SWIFT', 'GO');

-- CreateEnum
CREATE TYPE "OnlineInterview" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "PaidHoliday" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "FlexibleHours" AS ENUM ('YES', 'NO');

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "experience_level" "ExperienceLevel" NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "remote_option" "RemoteOption" NOT NULL,
    "job_type" "JobType" NOT NULL,
    "employment_type" "EmploymentType" NOT NULL,
    "skills" "Skill"[] DEFAULT ARRAY[]::"Skill"[],
    "online_interview" "OnlineInterview" NOT NULL,
    "paid_holiday" "PaidHoliday" NOT NULL,
    "flexible_hours" "FlexibleHours" NOT NULL,
    "min_salary" INTEGER NOT NULL,
    "max_salary" INTEGER NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
