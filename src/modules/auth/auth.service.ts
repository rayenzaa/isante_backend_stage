import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {  Utilisateur } from '@prisma/client';

import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthHelpers } from '../../shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from '../../configs/global.config';
import { Response } from "express"

import { AuthResponseDTO, LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { OtpService } from '../otp/otp.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UtilisateurService,
    private prisma: PrismaService,
    private jwtService: JwtService,
    private otpService: OtpService
  ) {}

  public async login({
    email,
    password,
  }: LoginUserDTO): Promise<AuthResponseDTO|null> {
    console.log("service", email, password)
    const userData = await this.userService.findUtilisateur({ email });
    console.log("userData", userData)
    if (!userData) {
      console.log("not found")
      throw new UnauthorizedException("user not found");
    }

    const isMatch = await AuthHelpers.verify(password, userData.password);

    if (!isMatch) {
      throw new UnauthorizedException("wrong credentials");
    }
    if (userData.status === "NVERIFIED") {
      this.otpService.generateOtp(userData.id, userData.email)
    }
    const payload: Utilisateur = {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
      dateCreation: userData.dateCreation,
      dateModification: userData.dateModification,
      login: userData.login,
      phone: userData.phone,
      phone2: userData.phone2,
      adresse: userData.adresse,
      ville: userData.ville,
      status: userData.status,
    };
    
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: GLOBAL_CONFIG.security.expiresIn,
    });

    return {
      user: payload,
      accessToken: accessToken,
    };
  }
  public async register(user: RegisterUserDTO): Promise<Utilisateur> {
    try {
      return await this.userService.createUtilisateur(user);
    } catch (error) {
      throw error;
    }  
  }
  public async logout(res:Response) {
    res.clearCookie('accessToken')
    return res.send({ message : "logout succesful******"}) 
}
}
