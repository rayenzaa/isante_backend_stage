import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
// import { LoggerListener } from 'src/modules/logger/logger.listener';
import { MyLogger } from 'src/modules/logger/logger.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

interface UserJWT {
  id: number;
  email: "string",
  password: "string",
  first_name: "string",
  last_name: "string",
  login: "string",
  phone: 0,
  phone2: 0,
  adresse: "string",
  ville: "string",
  role: "string"
  dateCreation: string;
  dateModification: string;
  iat: number;
  exp: number;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}
  async use(
    req: Request,
    res: Response,
    next: CallableFunction
  ): Promise<void> {
    const logger = new MyLogger();
    logger.setContext('API Request');
    logger.log(`${req.method} ${req.originalUrl}: ${JSON.stringify(req.body)}`);

    const accessTokenString: string = req.cookies['accessToken'];
    if (!accessTokenString) {
      next();
      return;
    }
    try {
      const accessToken: UserJWT = JSON.parse(
        Buffer.from(accessTokenString.split('.')[1], 'base64').toString()
      );
  
      console.log('accessToken', accessToken);
      if (
        req.method === 'POST' ||
        req.method === 'PUT' ||
        req.method === 'DELETE' ||
        req.method === 'PATCH'
      ) {
         await this.prisma.log.create({
          data: {
            action: 'placeholder',
            utilisateur: {
              connect: {
                id: accessToken.id,
              },
            },
          },
        });
        }

    }
    catch (error) {
      logger.error("Error parsing accessToken :" , error)
    }

   

    next();
  }
}
