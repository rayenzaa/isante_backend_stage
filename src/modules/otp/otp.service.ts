// src/modules/otp/otp.service.ts
import { Injectable, Inject } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import { MailService } from './mail.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
@Injectable()
export class OtpService {
  private otps = new Map<number, string>();

  constructor(
    private readonly mailService: MailService,
    private readonly utilisateurService: UtilisateurService
  
  ) {}

  async generateOtp(userId: number, userEmail: string): Promise<string> {
    const user = this.utilisateurService.findUtilisateur({email: userEmail})
    if (!user) {
      throw new Error('User not found');
  }
    const token = speakeasy.totp({
      secret: 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD',
      encoding: 'base32',
    });
    this.otps.set((await user).id, token);
    console.log(this.otps);
    setTimeout(() => this.otps.delete(userId), 30000); // OTP valid for 30 seconds

    await this.mailService.sendMail(
      userEmail,
      'Your OTP',
      `Your OTP is: ${token}`,
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Static Template</title>
      
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
        </head>
        <body style="
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #ffffff;
            font-size: 14px;
          ">
          <div style="
              max-width: 680px;
              margin: 0 auto;
              padding: 45px 30px 60px;
              background: #f4f7ff;
              background-size: 800px 452px;
              background-position: top center;
              font-size: 14px;
              color: #434343;
            ">
            <header>
              <table style="width: 100%;">
                <tbody>
                  <tr style="height: 0;">
                    <td>
                      <img alt src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1663574980688_114990/archisketch-logo" height="30px">
                    </td>
                    <td style="text-align: right;">
                      <span style="font-size: 16px; line-height: 30px; color: #ffffff;">12 Nov, 2021</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </header>
      
            <main>
              <div style="
                  margin: 0;
                  margin-top: 70px;
                  padding: 92px 30px 115px;
                  background: #ffffff;
                  border-radius: 30px;
                  text-align: center;
                ">
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                  <h1 style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 500;
                      color: #1f1f1f;
                    ">
                    Your OTP
                  </h1>
                  <p style="
                      margin: 0;
                      margin-top: 17px;
                      font-size: 16px;
                      font-weight: 500;
                    ">
                    Hey ${(await user).first_name} ${(await user).last_name},
                  </p>
                  <p style="
                      margin: 0;
                      margin-top: 17px;
                      font-weight: 500;
                      letter-spacing: 0.56px;
                    ">
                    Merci d'avoir choisi la société I-WAY. Utilisez l'OTP suivant pour terminer la procédure de changement d'adresse email. OTP est valable 
                    <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                    Ne partagez pas ce code avec d'autres.
                  </p>
                  <p style="
                      margin: 0;
                      margin-top: 60px;
                      font-size: 40px;
                      font-weight: 600;
                      letter-spacing: 25px;
                      color: #499fb6;
                    ">
                    ${token}
                  </p>
                </div>
              </div>
      
              <p style="
                  max-width: 400px;
                  margin: 0 auto;
                  margin-top: 90px;
                  text-align: center;
                  font-weight: 500;
                  color: #8c8c8c;
                ">
                Besoin d'aide? Demandez à
                <a href="contact@isante.com" style="color: #499fb6; text-decoration: none;">contact@isante.com</a>
              </p>
            </main>
      
            <footer style="
                width: 100%;
                max-width: 490px;
                margin: 20px auto 0;
                text-align: center;
                border-top: 1px solid #e6ebf1;
              ">
              <p style="
                  margin: 0;
                  margin-top: 40px;
                  font-size: 16px;
                  font-weight: 600;
                  color: #434343;
                ">
                Société I-WAY
              </p>
              <p style="margin: 0; margin-top: 8px; color: #434343;">
               RSP2+HXW, Tunis.
              </p>
              <div style="margin: 0; margin-top: 16px;">
                <a href target="_blank" style="display: inline-block;">
                  <img width="36px" alt="Facebook" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook">
                </a>
                <a href target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Instagram" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"></a>
                <a href target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Twitter" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter">
                </a>
                <a href target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Youtube" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"></a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343;">
                Copyright © 2024 I-Way. All rights reserved.
              </p>
            </footer>
          </div>
        </body>
      </html>
      `
    );

    return token;
  }

  verifyOtp(userId: number, token: string): boolean {
    console.log(userId, token)
    const validToken = this.otps.get(userId);
    console.log("validtoken :", validToken)
    if (!validToken) {
      return false;  // Return false if no token is stored for the given user ID
    }
    // Verify the token using speakeasy
    const tokenIsValid = speakeasy.totp.verify({
      secret: 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD', // This should be unique per user in a real application
      encoding: 'base32',
      token: token,
      window: 1  // Optional: defines a window where tokens are still valid (allowing some leeway in timing)
    });
    console.log(tokenIsValid)
    // if (tokenIsValid && validToken === token) {
    //   this.utilisateurService.verifyUser({userId})
    // }
    return tokenIsValid && validToken === token;
  }
  
}
