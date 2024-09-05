import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

import { LigneOrdonnanceService } from './ligne-ordonnance.service';
import { LigneOrdonnanceController } from './ligne-ordonnance.controller';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { UserModule } from '../utilisateur/utilisateur.module';

@Module({
  imports: [PrismaModule,UserModule],
  controllers: [LigneOrdonnanceController],
  providers: [LigneOrdonnanceService, PrismaService,UtilisateurService],
  exports: [LigneOrdonnanceService],
})
export class LigneOrdonnanceModule {}
