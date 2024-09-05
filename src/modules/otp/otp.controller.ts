// src/modules/otp/otp.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  
  @ApiTags('GENERER CODE OTP')
  @ApiOperation({ description: 'Login user' })
  @Post('generate')
  generateOtp(
    @Body('userId') userId: number,
    @Body('email') email: string,
  ): Promise<string> {
    return this.otpService.generateOtp(userId, email);
  }

  @Post('verify')
  verifyOtp(
    @Body('userId') userId: number,
    @Body('token') token: string,
  ): boolean {
    return this.otpService.verifyOtp(userId, token);
  }
}
