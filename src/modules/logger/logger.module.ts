import { Module } from '@nestjs/common';

import { MyLogger } from './logger.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MyLogger],
  exports: [MyLogger],
})
export class LoggerModule {}
