import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

import { UserListener } from '../utilisateur/utilisateur.listener';

import { MyLogger } from '../logger/logger.service';
import { LoggerListener } from '../logger/logger.listener';

@Injectable()
export class PrismaService extends PrismaClient<
  Prisma.PrismaClientOptions,
  'error' | 'query'
> {


  async onModuleInit() {
    await this.$connect();

    this.$on('error', (_e) => {
      const logger = new MyLogger();
      logger.error(_e.message);
      console.error(_e.message);
    });

    this.$use(UserListener.onCreated);
    // this.$use(LoggerListener.onAction);
  }

 
  }

