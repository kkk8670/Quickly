/*
  Warnings:

  - You are about to drop the column `amount` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.
  - Added the required column `price` to the `Bid` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobStartTime` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Made the column `customerId` on table `Job` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CUSTOMER', 'PROVIDER');

-- AlterEnum
ALTER TYPE "JobStatus" ADD VALUE 'MATCHED';

-- AlterTable
ALTER TABLE "Bid" DROP COLUMN "amount",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "JobStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "title",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "jobEndTime" TIMESTAMP(3),
ADD COLUMN     "jobStartTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "providerId" TEXT,
ADD COLUMN     "serviceType" TEXT NOT NULL,
ALTER COLUMN "customerId" SET NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "UserType" NOT NULL,
    "skills" TEXT,
    "rating" DOUBLE PRECISION,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
