-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('CREATE', 'UPDATE', 'READ', 'DELETE', 'ALL');

-- CreateEnum
CREATE TYPE "TypeReservation" AS ENUM ('DISTANCE', 'DOMICILE', 'CABINET');

-- CreateEnum
CREATE TYPE "TypeNotification" AS ENUM ('DEFAULT', 'VALIDATION', 'RETURN');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VISITEUR', 'ADHERENT', 'PS');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "phone2" INTEGER NOT NULL,
    "adresse" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" SERIAL NOT NULL,
    "idAdhrent" INTEGER NOT NULL,
    "idPs" INTEGER,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_date_ps" TIMESTAMP(3),
    "end_date_ps" TIMESTAMP(3),
    "type" "TypeReservation" NOT NULL,
    "motif" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "problemeSante" TEXT NOT NULL,
    "medicamentsEnCours" TEXT NOT NULL,
    "validation" BOOLEAN NOT NULL DEFAULT false,
    "retour" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "type" "TypeNotification" NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reservationId" INTEGER NOT NULL,
    "adherentId" INTEGER NOT NULL,
    "psId" INTEGER,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicament" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "libelle" TEXT NOT NULL,
    "prixUnitaire" DOUBLE PRECISION NOT NULL,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModification" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ordonnance" (
    "id" SERIAL NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "prixTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ordonnance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LigneOrdonnance" (
    "id" SERIAL NOT NULL,
    "idOrdonnance" INTEGER NOT NULL,
    "idMedicament" INTEGER NOT NULL,
    "qte" INTEGER NOT NULL DEFAULT 0,
    "prixLigne" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "LigneOrdonnance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_login_key" ON "Utilisateur"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medicament_code_key" ON "Medicament"("code");

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_idPs_fkey" FOREIGN KEY ("idPs") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_idAdhrent_fkey" FOREIGN KEY ("idAdhrent") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "RendezVous"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_adherentId_fkey" FOREIGN KEY ("adherentId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_psId_fkey" FOREIGN KEY ("psId") REFERENCES "Utilisateur"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordonnance" ADD CONSTRAINT "Ordonnance_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneOrdonnance" ADD CONSTRAINT "LigneOrdonnance_idOrdonnance_fkey" FOREIGN KEY ("idOrdonnance") REFERENCES "Ordonnance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LigneOrdonnance" ADD CONSTRAINT "LigneOrdonnance_idMedicament_fkey" FOREIGN KEY ("idMedicament") REFERENCES "Medicament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
