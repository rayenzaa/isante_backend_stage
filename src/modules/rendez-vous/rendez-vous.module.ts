import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

import { RendezVousService } from './rendez-vous.service';
import { RendezVousController } from './rendez-vous.controller';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { UserModule } from '../utilisateur/utilisateur.module';

@Module({
  imports: [PrismaModule,UserModule],
  controllers: [RendezVousController],
  providers: [RendezVousService, PrismaService,UtilisateurService],
  exports: [RendezVousService],
})
export class RendezVousModule {}
