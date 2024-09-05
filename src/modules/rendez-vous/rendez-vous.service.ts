import { Prisma, RendezVous } from '@prisma/client';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createRendezVousDTO } from './rendez-vous-create.dto';

@Injectable()
export class RendezVousService {
  constructor(
    private prisma: PrismaService,
    ) {}

  async findRendezVousByid(
    RendezvousWhereUniqueInput: Prisma.RendezVousWhereUniqueInput
  ): Promise<RendezVous | null> {
    return this.prisma.rendezVous.findUnique({
      where: RendezvousWhereUniqueInput,
    });
  }

  
  async updateRendezVous(params: {
    where: Prisma.RendezVousWhereUniqueInput;
    data: Prisma.RendezVousUpdateInput;
  }): Promise<RendezVous> {
    const { where, data } = params;
    return this.prisma.rendezVous.update({
      data,
      where,
    });
  }
  async findRendezVous(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RendezVousWhereUniqueInput;
    where?: Prisma.RendezVousWhereInput;
    orderBy?: Prisma.RendezVousOrderByWithRelationInput;
  }): Promise<RendezVous[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.rendezVous.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        adherent: true,
      },
    });
  }
  async create(data: createRendezVousDTO): Promise<RendezVous> {
    // Parse start_date and end_date to Date instances
    const parsedStartDate = new Date(data.start_date);
    const parsedEndDate = new Date(data.end_date);

    // Validate that start_date and end_date are valid Date instances
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      throw new BadRequestException("start_date and end_date must be valid Date instances");
    }

    // Prepare the data for Prisma
    const parsedData = {
      start_date: parsedStartDate,
      end_date: parsedEndDate,
      type: data.type,
      motif: data.motif,
      allergies: data.allergies,
      problemeSante: data.problemeSante,
      medicamentsEnCours: data.medicamentsEnCours,
      ps: {
        connect: { id: data.idPs },
      },
      adherent: {
        connect: { id: data.idAdherent },
      },
    };

    return this.prisma.rendezVous.create({
      data: parsedData,
    });
  }
  async delete(where: Prisma.RendezVousWhereUniqueInput): Promise<void> {
    const rendezVous = await this.prisma.rendezVous.findUnique({
      where, 
    });
    if (!rendezVous) {
      throw new NotFoundException('rendez-vous not found');
    }
    await this.prisma.rendezVous.delete({
      where: { id: rendezVous.id },
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



