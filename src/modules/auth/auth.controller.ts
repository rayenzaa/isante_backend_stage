import { Body, Controller, Post,Get ,Req, Res} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Utilisateur } from '@prisma/client';
import { Response as res } from 'express'

import { JWT_EXPIRY_SECONDS } from '../../shared/constants/global.constants';

import { AuthService } from './auth.service';
import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // @ApiOperation({ description: 'Login user' })
  // @ApiBody({ type: LoginUserDTO })
  // @ApiResponse({ type: AuthResponseDTO })
  async login(
    @Body() user: LoginUserDTO,
    @Res() res
  ): Promise<Utilisateur> {
    const loginData = await this.authService.login(user);
    console.log(loginData)
    res.cookie('accessToken', loginData.accessToken, {
      expires: new Date(new Date().getTime() + JWT_EXPIRY_SECONDS * 1000),
      sameSite: 'strict',
      secure: true,
      httpOnly: true,
    });

    return res.status(200).send(loginData);
  }

  @Post('register')
  async register(@Body() user: RegisterUserDTO): Promise<Utilisateur> {
    return this.authService.register(user);
  }

  @Post('logout')
  logout(@Res() res): void {
    res.clearCookie('accessToken');
    res.status(200).send({ success: true });
  }
}
