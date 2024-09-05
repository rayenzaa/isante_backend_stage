/*
  Warnings:

  - You are about to drop the column `code` on the `Medicament` table. All the data in the column will be lost.
  - You are about to drop the column `prixUnitaire` on the `Medicament` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[CODE_PCT]` on the table `Medicament` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `AP` to the `Medicament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CATEGORIE` to the `Medicament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CODE_PCT` to the `Medicament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DCI` to the `Medicament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NOM_COMMERCIAL` to the `Medicament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PRIX_PUBLIC` to the `Medicament` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TARIF_REFERENCE` to the `Medicament` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Medicament_code_key";

-- AlterTable
ALTER TABLE "Medicament" DROP COLUMN "code",
DROP COLUMN "prixUnitaire",
ADD COLUMN     "AP" TEXT NOT NULL,
ADD COLUMN     "CATEGORIE" TEXT NOT NULL,
ADD COLUMN     "CODE_PCT" TEXT NOT NULL,
ADD COLUMN     "DCI" TEXT NOT NULL,
ADD COLUMN     "NOM_COMMERCIAL" TEXT NOT NULL,
ADD COLUMN     "PRIX_PUBLIC" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "TARIF_REFERENCE" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medicament_CODE_PCT_key" ON "Medicament"("CODE_PCT");
