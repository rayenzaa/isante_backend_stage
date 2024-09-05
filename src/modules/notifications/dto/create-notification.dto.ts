import { TypeNotification } from "@prisma/client";

export class CreateNotificationDto {
  type: TypeNotification;
  message: string;
  reservationId: number;
  adherentId: number;
  psId?: number;
}
