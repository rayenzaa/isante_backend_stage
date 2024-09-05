import { IsInt, IsDate, IsString } from 'class-validator';
import { TypeReservation } from '@prisma/client';


export class createRendezVousDTO {
  @IsInt()
  idAdherent: number;
  @IsInt()
  idPs: number;
  @IsString()
  start_date: string
  @IsString()
  end_date: string
  type: TypeReservation
  @IsString()
  motif: string
  @IsString()
  allergies: string
  @IsString()
  problemeSante: string
  @IsString()
  medicamentsEnCours: string


}
