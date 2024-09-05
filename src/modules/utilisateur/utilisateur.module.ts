import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

import { UtilisateurService } from './utilisateur.service';
import { UserController } from './utilisateur.controller';
import { UserListener } from './utilisateur.listener';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UtilisateurService, PrismaService, UserListener],
  exports: [UtilisateurService],
})
export class UserModule {}
