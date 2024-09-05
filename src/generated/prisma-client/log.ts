import { Utilisateur } from './utilisateur';
import { ApiProperty } from '@nestjs/swagger';

export class Log {
  @ApiProperty({ type: Number })
  idLog: number;

  @ApiProperty({ type: Number })
  idUtilisateur: number;

  @ApiProperty({ type: String })
  action: string;

  @ApiProperty({ type: Date })
  dateLog: Date;

  @ApiProperty({ type: () => Utilisateur })
  utilisateur: Utilisateur;
}
