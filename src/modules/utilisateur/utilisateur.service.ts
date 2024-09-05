import { Prisma, Utilisateur } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { updateUserDTO } from './utilisateur-update.dto';

@Injectable()
export class UtilisateurService {
  constructor(private prisma: PrismaService) {}
  async findUtilisateur(
    utilisateurWhereUniqueInput: Prisma.UtilisateurWhereUniqueInput
  ): Promise<Utilisateur | null> {
    return this.prisma.utilisateur.findUnique({
      where: utilisateurWhereUniqueInput,
    });
  }
  async Utilisateurs(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UtilisateurWhereUniqueInput;
    where?: Prisma.UtilisateurWhereInput;
    orderBy?: Prisma.UtilisateurOrderByWithRelationInput;
  }): Promise<Utilisateur[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.utilisateur.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async createUtilisateur(
    data: Prisma.UtilisateurCreateInput
  ): Promise<Utilisateur> {
    return this.prisma.utilisateur.create({
      data,
    });
  }
  async updateUtilisateur(params: {
    where: Prisma.UtilisateurWhereUniqueInput;
    data: updateUserDTO;
  }): Promise<Utilisateur> {
    const { where, data } = params;
    return this.prisma.utilisateur.update({
      data,
      where,
    });
  }
  async verifyUser (params: {
    userId: number
  }): Promise<Utilisateur> {
    return this.prisma.utilisateur.update({
      where: {id: params.userId},
      data: { status: "VERIFIED"}
    })
  }
  async deleteUtilisateur(
    where: Prisma.UtilisateurWhereUniqueInput
  ): Promise<Utilisateur> {
    return this.prisma.utilisateur.delete({
      where,
    });
  }
}
