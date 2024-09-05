-- AlterTable
ALTER TABLE "Ordonnance" ALTER COLUMN "prixTotal" DROP NOT NULL,
ALTER COLUMN "prixTotal" SET DEFAULT 0;
