/*
  Warnings:

  - You are about to drop the column `account_id` on the `Employee` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('EMPLOYEE', 'COMPANY');

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_account_id_fkey";

-- DropIndex
DROP INDEX "Employee_account_id_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "account_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "type",
ADD COLUMN     "type" "UserType" NOT NULL;

-- DropEnum
DROP TYPE "AccountType";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_user_id_key" ON "Employee"("user_id");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
