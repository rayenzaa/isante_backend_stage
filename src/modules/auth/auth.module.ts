import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { JWT_SECRET } from '../../shared/constants/global.constants';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

import { JwtStrategy } from './auth.jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from '../otp/otp.service';
import { MailService } from '../otp/mail.service';

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    PrismaModule,
  ],
  providers: [UtilisateurService, AuthService, JwtStrategy, PrismaService, OtpService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
