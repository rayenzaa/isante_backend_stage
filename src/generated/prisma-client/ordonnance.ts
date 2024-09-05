import { LigneOrdonnance } from './ligne_ordonnance';
import { Utilisateur } from './utilisateur';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Ordonnance {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  idUtilisateur: number;

  @ApiProperty({ isArray: true, type: () => LigneOrdonnance })
  ligneOrdonnance: LigneOrdonnance[];

  @ApiPropertyOptional({ type: Number })
  prixTotal?: number;

  @ApiProperty({ type: () => Utilisateur })
  utilisateur: Utilisateur;

  @ApiPropertyOptional({ type: Date })
  dateCreation?: Date;
}
