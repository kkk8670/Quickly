-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "autoAcceptPrice" DOUBLE PRECISION,
ADD COLUMN     "budgetMax" DOUBLE PRECISION,
ADD COLUMN     "budgetMin" DOUBLE PRECISION,
ADD COLUMN     "selectedBidId" TEXT;
