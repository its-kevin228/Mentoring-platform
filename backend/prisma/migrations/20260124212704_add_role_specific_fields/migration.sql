-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "difficulties" TEXT,
ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "objectives" TEXT;
