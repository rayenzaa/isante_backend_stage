import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Notification, Prisma } from "@prisma/client";
import { JwtAuthGuard } from "../auth/auth.jwt.guard";
import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from "./dto/create-notification.dto";
@ApiTags('notification')
@Controller('notification')
export class NotificationController {
    constructor(private NotificationService: NotificationService) {}
    @Get()
    // @UseGuards(JwtAuthGuard)
    async getAll(): Promise<Notification[]> {
      return this.NotificationService.findNotification({});
    }
    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'get notification by id' })
    // @ApiResponse({ type: Notification })
    async getNotificationById(@Param('id') id: number): Promise<Notification> {
      return await this.NotificationService.findNotificationByid({id});
    }
    @Get('/adherent/:id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'get notification by id' })
    // @ApiResponse({ type: Notification })
    async getNotificationByAdherentId(@Param('id', ParseIntPipe) id: number) {
      return await this.NotificationService.findNotification({where:{adherentId: id}});
    }
    @Get('/ps/:id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'get notification by id' })
    // @ApiResponse({ type: Notification })
    async getNotificationByPsId(@Param('id', ParseIntPipe) id: number) {
      return await this.NotificationService.findNotification({where:{psId: id}});
    }
    @Post()
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'créer un notification ' })
    // @ApiBody({ type: CreateCommandeDto })
    // @ApiCreatedResponse({ type: CommandeEntity })
    async create(
      @Body() createNotificationDTO: CreateNotificationDto,
    ): Promise<Notification> {
      return await this.NotificationService.create(createNotificationDTO);
    }  
    //to delete all bon livr
  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  async update(
    @Body() updateNotificationDTO: Prisma.NotificationUpdateInput,
    @Param('id') id: number,
  ): Promise<Notification> 
  {
    return await this.NotificationService.updateNotification({where: {id: id}, data: updateNotificationDTO});
  }
  @Delete('/multiple')
  // @UseGuards(JwtAuthGuard)
  async deleteMultiple(@Body('ids') ids: number[]) {
    return await this.NotificationService.deleteMultiple(ids);
  }
  //delete comande
  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.NotificationService.delete({id})
  }
}
  