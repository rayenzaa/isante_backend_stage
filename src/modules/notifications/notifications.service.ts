import { Prisma, Notification } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    ) {}

  async findNotificationByid(
    NotificationWhereUniqueInput: Prisma.NotificationWhereUniqueInput
  ): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: NotificationWhereUniqueInput,
    });
  }

  
  async updateNotification(params: {
    where: Prisma.NotificationWhereUniqueInput;
    data: Prisma.NotificationUpdateInput;
  }): Promise<Notification> {
    const { where, data } = params;
    return this.prisma.notification.update({
      data,
      where,
    });
  }
  async findNotification(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NotificationWhereUniqueInput;
    where?: Prisma.NotificationWhereInput;
    orderBy?: Prisma.NotificationOrderByWithRelationInput;
  }): Promise<Notification[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.notification.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
  async create(
    data: CreateNotificationDto
  ): Promise<Notification> {
    return this.prisma.notification.create({
      data,
    });
  }
  async delete(where: Prisma.NotificationWhereUniqueInput): Promise<void> {
    const notification = await this.prisma.notification.findUnique({
      where, 
    });
    if (!notification) {
      throw new NotFoundException('rendez-vous not found');
    }
    await this.prisma.notification.delete({
      where: { id: notification.id },
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



