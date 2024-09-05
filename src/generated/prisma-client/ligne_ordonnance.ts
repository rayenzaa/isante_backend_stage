import { Ordonnance } from './ordonnance';
import { Medicament } from './medicament';
import { ApiProperty } from '@nestjs/swagger';

export class LigneOrdonnance {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Number })
  idOrdonnance: number;

  @ApiProperty({ type: Number })
  idMedicament: number;

  @ApiProperty({ type: () => Ordonnance })
  ordonnance: Ordonnance;

  @ApiProperty({ type: () => Medicament })
  medicament: Medicament;

  @ApiProperty({ type: Number })
  qte: number;

  @ApiProperty({ type: Number })
  prixLigne: number;
}
