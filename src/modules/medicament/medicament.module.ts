import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../utilisateur/utilisateur.module';
import { MedicamentService } from './medicament.service';
import { MedicamentController } from './medicament.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [MedicamentController],
  providers: [MedicamentService],
  exports: [MedicamentService],
})
export class MedicamentModule {}
