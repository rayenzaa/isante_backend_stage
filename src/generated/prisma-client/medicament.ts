import { LigneOrdonnance } from './ligne_ordonnance';
import { ApiProperty } from '@nestjs/swagger';

export class Medicament {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  CODE_PCT: number;

  @ApiProperty({ type: String })
  NOM_COMMERCIAL: string;

  @ApiProperty({ type: Number })
  PRIX_PUBLIC: number;

  @ApiProperty({ type: Number })
  TARIF_REFERENCE: number;

  @ApiProperty({ type: String })
  CATEGORIE: string;

  @ApiProperty({ type: String })
  DCI: string;

  @ApiProperty({ type: String })
  AP: string;

  @ApiProperty({ isArray: true, type: () => LigneOrdonnance })
  ligneOrdonnance: LigneOrdonnance[];

  @ApiProperty({ type: Date })
  dateCreation: Date;

  @ApiProperty({ type: Date })
  dateModification: Date;
}
