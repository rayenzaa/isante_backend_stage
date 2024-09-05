/*
  Warnings:

  - Changed the type of `CODE_PCT` on the `Medicament` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Medicament" DROP COLUMN "CODE_PCT",
ADD COLUMN     "CODE_PCT" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medicament_CODE_PCT_key" ON "Medicament"("CODE_PCT");
