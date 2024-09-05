-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NVERIFIED', 'VERIFIED');

-- AlterTable
ALTER TABLE "Utilisateur" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NVERIFIED';
