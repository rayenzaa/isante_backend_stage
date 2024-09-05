import { Prisma, Medicament } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MedicamentService {
  constructor(
    private prisma: PrismaService,
    ) {}

  async findMedicamentByid(
    MedicamentWhereUniqueInput: Prisma.MedicamentWhereUniqueInput
  ): Promise<Medicament | null> {
    return this.prisma.medicament.findUnique({
      where: MedicamentWhereUniqueInput,
    });
  }

  
  async updateMedicament(params: {
    where: Prisma.MedicamentWhereUniqueInput;
    data: Prisma.MedicamentUpdateInput;
  }): Promise<Medicament> {
    const { where, data } = params;
    return this.prisma.medicament.update({
      data,
      where,
    });
  }
  async findMedicament(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MedicamentWhereUniqueInput;
    where?: Prisma.MedicamentWhereInput;
    orderBy?: Prisma.MedicamentOrderByWithRelationInput;
  }): Promise<Medicament[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.medicament.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: {
        dateCreation: "desc"
      },
    });
  }
  async create(
    data: Prisma.MedicamentCreateInput
  ): Promise<Medicament> {
    return this.prisma.medicament.create({
      data,
    });
  }
  async delete(where: Prisma.MedicamentWhereUniqueInput): Promise<string> {
    const medicament = await this.prisma.medicament.findUnique({
      where, 
    });
    if (!medicament) {
      throw new NotFoundException('rendez-vous not found');
    }
    await this.prisma.medicament.delete({
      where: { id: medicament.id },
    });
    console.log(`medicament ${medicament.NOM_COMMERCIAL} a eté supprimé`)
    return `medicament ${medicament.NOM_COMMERCIAL} a eté supprimé`
  }
  async deleteMultiple(ids: number[]): Promise<void> {
    if (!Array.isArray(ids)) {
      throw new Error('IDs must be an array');
    }
    for (const id of ids) {
      await this.delete({ id });
    }
  }
}



