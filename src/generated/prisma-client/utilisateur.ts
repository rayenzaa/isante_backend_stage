import { Ordonnance } from './ordonnance';
import { RendezVous } from './rendez_vous';
import { Notification } from './notification';
import { Log } from './log';
import { Role, Status } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Utilisateur {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  login?: string;

  @ApiPropertyOptional({ type: String })
  password?: string;

  @ApiProperty({ type: String })
  first_name: string;

  @ApiProperty({ type: String })
  last_name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: Number })
  phone?: number;

  @ApiPropertyOptional({ type: Number })
  phone2?: number;

  @ApiProperty({ type: String })
  adresse: string;

  @ApiPropertyOptional({ type: String })
  ville?: string;

  @ApiProperty({ type: Date })
  dateCreation: Date;

  @ApiProperty({ type: Date })
  dateModification: Date;

  @ApiProperty({ isArray: true, type: () => Ordonnance })
  ordonnances: Ordonnance[];

  @ApiProperty({ enum: Role, enumName: 'Role' })
  role: Role;

  @ApiProperty({ isArray: true, type: () => RendezVous })
  reservationPs: RendezVous[];

  @ApiProperty({ isArray: true, type: () => RendezVous })
  reservationAdherent: RendezVous[];

  @ApiProperty({ isArray: true, type: () => Notification })
  notificationPs: Notification[];

  @ApiProperty({ isArray: true, type: () => Notification })
  notificationAdherent: Notification[];

  @ApiProperty({ enum: Status, enumName: 'Status' })
  status: Status = Status.NVERIFIED;

  @ApiProperty({ isArray: true, type: () => Log })
  logs: Log[];
}
