// src/otp/otp.module.ts
import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import  { MailService } from './mail.service'
import { OtpController } from './otp.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UtilisateurService } from '../utilisateur/utilisateur.service';

@Module({
  providers: [OtpService, MailService, UtilisateurService],
  controllers: [OtpController],
  imports: [PrismaModule],
  exports: [OtpService],
})
export class OtpModule {}
