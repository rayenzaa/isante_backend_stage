import { IsInt, IsArray, ValidateNested, ArrayMinSize, Min } from 'class-validator';
import { Type } from 'class-transformer';

class MedicamentDto {
  @IsInt()
  idMedicament: number;

  @IsInt()
  @Min(1)
  qty: number;
}

export class CreateOrdonnanceDto {
  @IsInt()
  idUtilisateur: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicamentDto)
  @ArrayMinSize(1)
  medicaments: MedicamentDto[];
}
