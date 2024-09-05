import { Utilisateur } from './utilisateur';
import { Notification } from './notification';
import { TypeReservation } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RendezVous {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  idAdhrent: number;

  @ApiPropertyOptional({ type: Number })
  idPs?: number;

  @ApiProperty({ type: Date })
  dateCreation: Date;

  @ApiProperty({ type: Date })
  dateModification: Date;

  @ApiProperty({ type: Date })
  start_date: Date;

  @ApiProperty({ type: Date })
  end_date: Date;

  @ApiPropertyOptional({ type: Date })
  start_date_ps?: Date;

  @ApiPropertyOptional({ type: Date })
  end_date_ps?: Date;

  @ApiProperty({ enum: TypeReservation, enumName: 'TypeReservation' })
  type: TypeReservation;

  @ApiProperty({ type: String })
  motif: string;

  @ApiProperty({ type: String })
  allergies: string;

  @ApiProperty({ type: String })
  problemeSante: string;

  @ApiProperty({ type: String })
  medicamentsEnCours: string;

  @ApiProperty({ type: Boolean })
  validation: boolean;

  @ApiProperty({ type: Boolean })
  annulation: boolean;

  @ApiProperty({ type: Boolean })
  retour: boolean;

  @ApiPropertyOptional({ type: () => Utilisateur })
  ps?: Utilisateur;

  @ApiPropertyOptional({ type: () => Utilisateur })
  adherent?: Utilisateur;

  @ApiProperty({ isArray: true, type: () => Notification })
  notifications: Notification[];
}
