import { RendezVous } from './rendez_vous';
import { Utilisateur } from './utilisateur';
import { TypeNotification } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Notification {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ enum: TypeNotification, enumName: 'TypeNotification' })
  type: TypeNotification;

  @ApiProperty({ type: String })
  message: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: () => RendezVous })
  reservation: RendezVous;

  @ApiProperty({ type: Number })
  reservationId: number;

  @ApiProperty({ type: () => Utilisateur })
  adherent: Utilisateur;

  @ApiProperty({ type: Number })
  adherentId: number;

  @ApiPropertyOptional({ type: () => Utilisateur })
  ps?: Utilisateur;

  @ApiPropertyOptional({ type: Number })
  psId?: number;
}
