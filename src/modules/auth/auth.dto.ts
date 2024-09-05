import { Utilisateur, Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { INVALID_EMAIL } from '../../shared/constants/strings';
import { Utilisateur as UtilisateurEntity } from 'src/generated/prisma-client/utilisateur';

export class AuthResponseDTO {
  @ApiProperty({ type: UtilisateurEntity })
  user: Utilisateur;
  accessToken: string;
}

export class RegisterUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  last_name: string;

  @ApiProperty()
  login?: string;

  @ApiProperty()
  phone?: number;

  @ApiProperty()
  phone2?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  adresse: string;

  @ApiProperty()
  ville?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty()
  role: Role;


}

export class LoginUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail({}, { message: INVALID_EMAIL })
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
