import { Role, Status } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';


export class updateUserDTO {
  first_name: string;
  last_name: string;
  email: string; 
  login: string;
  role: Role
  adresse: string;
  ville: string;
  @IsOptional()
  @IsString()
  password?: string;
}
