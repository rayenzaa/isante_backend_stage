import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../utilisateur/utilisateur.module';
import { OrdonnanceService } from './ordonnance.service';
import { OrdonnanceController } from './ordonnance.controller';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [OrdonnanceController],
  providers: [OrdonnanceService],
  exports: [OrdonnanceService],
})
export class OrdonnanceModule {}
