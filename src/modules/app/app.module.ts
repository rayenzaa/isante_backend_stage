// nestjs modules
import { Module } from '@nestjs/common';
import { MiddlewareConsumer } from '@nestjs/common';

// config
import { ConfigModule } from '@nestjs/config';
import { GLOBAL_CONFIG } from '../../configs/global.config';

// modules
import { UserModule } from '../utilisateur/utilisateur.module';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { LoggerModule } from '../logger/logger.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';
import { RendezVousModule } from '../rendez-vous/rendez-vous.module';
import { MedicamentModule  } from '../medicament/medicament.module';
import { LigneOrdonnanceModule } from '../ligne-ordonnance/ligne-ordonnance.module';
import { OrdonnanceModule } from '../ordonnance/ordonnance.module'
import { NotificationModule } from '../notifications/notifications.module'
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    LoggerModule,
    PrismaModule,
    AuthModule,
    UserModule,
    RendezVousModule,
    MedicamentModule,
    LigneOrdonnanceModule,
    OrdonnanceModule,
    NotificationModule,
    OtpModule,
    ConfigModule.forRoot({ isGlobal: true, load: [() => GLOBAL_CONFIG] }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
