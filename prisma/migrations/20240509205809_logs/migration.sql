-- CreateTable
CREATE TABLE "Log" (
    "idLog" SERIAL NOT NULL,
    "idUtilisateur" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "dateLog" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("idLog")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;
