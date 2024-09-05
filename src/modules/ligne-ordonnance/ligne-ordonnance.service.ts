import { Prisma, LigneOrdonnance } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LigneOrdonnanceService {
  constructor(
    private prisma: PrismaService,
    ) {}

  async findLigneOrdonnanceByid(
    LigneOrdonnanceWhereUniqueInput: Prisma.LigneOrdonnanceWhereUniqueInput
  ): Promise<LigneOrdonnance | null> {
    return this.prisma.ligneOrdonnance.findUnique({
      where: LigneOrdonnanceWhereUniqueInput,
    });
  }

  
  async updateLigneOrdonnance(params: {
    where: Prisma.LigneOrdonnanceWhereUniqueInput;
    data: Prisma.LigneOrdonnanceUpdateInput;
  }): Promise<LigneOrdonnance> {
    const { where, data } = params;
    return this.prisma.ligneOrdonnance.update({
      data,
      where,
    });
  }
  async findLigneOrdonnance(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LigneOrdonnanceWhereUniqueInput;
    where?: Prisma.LigneOrdonnanceWhereInput;
    orderBy?: Prisma.LigneOrdonnanceOrderByWithRelationInput;
  }): Promise<LigneOrdonnance[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.ligneOrdonnance.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async create(
    data: Prisma.LigneOrdonnanceCreateInput
  ): Promise<LigneOrdonnance> {
    return this.prisma.ligneOrdonnance.create({
      data,
    });
  }
  async delete(where: Prisma.LigneOrdonnanceWhereUniqueInput): Promise<void> {
    const ligneOrdonnance = await this.prisma.ligneOrdonnance.findUnique({
      where, 
    });
    if (!ligneOrdonnance) {
      throw new NotFoundException('rendez-vous not found');
    }
    await this.prisma.ligneOrdonnance.delete({
      where: { id: ligneOrdonnance.id },
    });
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



