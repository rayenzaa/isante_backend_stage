import { Prisma, Ordonnance } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrdonnanceDto } from './ordonnance.dto';

@Injectable()
export class OrdonnanceService {
  constructor(
    private prisma: PrismaService,
    ) {}

    async findOrdonnanceById(
      OrdonnanceWhereUniqueInput: Prisma.OrdonnanceWhereUniqueInput
    ): Promise<any> {
      const ordonnance = await this.prisma.ordonnance.findUnique({
        where: OrdonnanceWhereUniqueInput,
        include: {
          ligneOrdonnance: {
            include: {
              medicament: true
            }
          },
          utilisateur: true
        }
      });
    
      if (!ordonnance) {
        return null;
      }
    
      // Structure the response
      const structuredResponse = {
        id: ordonnance.id,
        idUtilisateur: ordonnance.idUtilisateur,
        utilisateur: {
          id: ordonnance.utilisateur.id,
          name: ordonnance.utilisateur.first_name,
          email: ordonnance.utilisateur.email
        },
        prixTotal: ordonnance.prixTotal,
        ligneOrdonnance: ordonnance.ligneOrdonnance.map(ligne => ({
          id: ligne.id,
          idOrdonnance: ligne.idOrdonnance,
          idMedicament: ligne.idMedicament,
          medicament: {
            id: ligne.medicament.id,
            codePct: ligne.medicament.CODE_PCT,
            nomCommercial: ligne.medicament.NOM_COMMERCIAL,
            prixPublic: ligne.medicament.PRIX_PUBLIC,
            tarifReference: ligne.medicament.TARIF_REFERENCE,
            categorie: ligne.medicament.CATEGORIE,
            dci: ligne.medicament.DCI,
            ap: ligne.medicament.AP
          },
          qte: ligne.qte,
          prixLigne: ligne.prixLigne
        }))
      };
    
      return structuredResponse;
    }
    

  
  async updateOrdonnance(params: {
    where: Prisma.OrdonnanceWhereUniqueInput;
    data: Prisma.OrdonnanceUpdateInput;
  }): Promise<Ordonnance> {
    const { where, data } = params;
    return this.prisma.ordonnance.update({
      data,
      where,
    });
  }
  async findOrdonnance(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrdonnanceWhereUniqueInput;
    where?: Prisma.OrdonnanceWhereInput;
    orderBy?: Prisma.OrdonnanceOrderByWithRelationInput;
  }): Promise<Ordonnance[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const ordonnances = await this.prisma.ordonnance.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        utilisateur: true,
        ligneOrdonnance: {
          include: {
            medicament: true,
          },
        },
      },
    });

    // Calculate prixTotal and prixLigne for each ordonnance
    return ordonnances.map(ordonnance => {
      const total = ordonnance.ligneOrdonnance.reduce((sum, ligne) => {
        ligne.prixLigne = ligne.qte * ligne.medicament.PRIX_PUBLIC;
        return sum + ligne.prixLigne;
      }, 0);
      return { ...ordonnance, prixTotal: total };
    });
  }
  async create(createOrdonnanceDto: CreateOrdonnanceDto) {
    const { idUtilisateur, medicaments } = createOrdonnanceDto;

    let prixTotal = 0;

    const ligneOrdonnanceData = await Promise.all(medicaments.map(async med => {
      const medicament = await this.prisma.medicament.findUnique({
        where: { id: med.idMedicament },
      });
      if (!medicament) {
        throw new Error(`Medicament with id ${med.idMedicament} not found`);
      }

      const prixLigne = medicament.PRIX_PUBLIC * med.qty;
      prixTotal += prixLigne;

      return {
        idMedicament: med.idMedicament,
        qte: med.qty,
        prixLigne,
      };
    }));

    // Create the ordonnance with initial data
    const ordonnance = await this.prisma.ordonnance.create({
      data: {
        idUtilisateur,
        ligneOrdonnance: {
          create: ligneOrdonnanceData,
        },
        prixTotal,
      },
      include: {
        ligneOrdonnance: true,
      },
    });

    return {
      id: ordonnance.id,
      idUtilisateur: ordonnance.idUtilisateur,
      prixTotal: ordonnance.prixTotal,
      ligneOrdonnance: ordonnance.ligneOrdonnance,
    };
  }
  async delete(where: Prisma.OrdonnanceWhereUniqueInput): Promise<void> {
    const ordonnance = await this.prisma.ordonnance.findUnique({
      where, 
    });
    if (!ordonnance) {
      throw new NotFoundException('rendez-vous not found');
    }
    await this.prisma.ordonnance.delete({
      where: { id: ordonnance.id },
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



