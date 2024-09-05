import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Utilisateur } from '@prisma/client';

import { JWT_SECRET } from '../../shared/constants/global.constants';
import { PrismaService } from '../prisma/prisma.service';

const cookieExtractor = (req: { cookies: { accessToken: any } }) =>
  req?.cookies.accessToken;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('token'),
        cookieExtractor,
      ]),
      ignoreExpiration: process.env.NODE_ENV === 'dev',
      secretOrKey: JWT_SECRET,
    });
  }
  async validate({ email, exp }: Utilisateur & { exp?: number }): Promise<Utilisateur> {
  
    //teest ken expireed 
       if (exp && Date.now() >= exp * 1000) {
         console.log('Token has expired');
         throw new UnauthorizedException('Token has expired');
       }
     
       console.log(exp,Date.now()/1000,Date.now()/1000 >=exp, "expr");
       const user = await this.prisma.utilisateur.findUnique({
         where: { email },
       });
     
       if (!user) {
        
         throw new UnauthorizedException();
       }
     
       return user;
     }
}
