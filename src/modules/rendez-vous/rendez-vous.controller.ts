import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RendezVous, Prisma } from '@prisma/client';
import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { RendezVousService } from './rendez-vous.service';
import { createRendezVousDTO } from './rendez-vous-create.dto';

@ApiTags('rendezvous')
@Controller('rendezvous')
export class RendezVousController {
  constructor(private RendezVousService: RendezVousService) {}

  @Get()
  // @UseGuards(JwtAuthGuard)
  async getAll(): Promise<RendezVous[]> {
    const test = new Date()
    console.log(test)
    return this.RendezVousService.findRendezVous({});
  }
  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'get rendez-vous by id' })
  // @ApiResponse({ type: RendezVous })
  async getRendezvousById(@Param('id') id: number): Promise<RendezVous> {
    return await this.RendezVousService.findRendezVousByid({id});
  }
  @Get('ps/:idPs')
  // @UseGuards(JwtAuthGuard)
  async getRendezvousByPs(@Param('idPs', ParseIntPipe) idPs: number): Promise<RendezVous[]> {
    return this.RendezVousService.findRendezVous({where: {idPs: idPs}});
  }
  @Get('adherent/:idAdherent')
  // @UseGuards(JwtAuthGuard)
  async getRendezvousByadherent(@Param('idAdherent', ParseIntPipe) idAdherent: number): Promise<RendezVous[]> {
    return this.RendezVousService.findRendezVous({where: {idAdhrent: idAdherent}});
  }
  @Post()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'créer un rendez-vous ' })
  // @ApiBody({ type: CreateCommandeDto })
  // @ApiCreatedResponse({ type: CommandeEntity })
  async create(
    @Body() createRendezVousDTO: createRendezVousDTO,
  ): Promise<RendezVous> {
    return await this.RendezVousService.create(createRendezVousDTO);
  }  
  //to delete all bon livr
@Patch(':id')
// @UseGuards(JwtAuthGuard)
async update(
  @Body() updateRendezVousDTO: Prisma.RendezVousUpdateInput,
  @Param('id', ParseIntPipe) id: number,
): Promise<RendezVous> 
{
  return await this.RendezVousService.updateRendezVous({where: {id: id}, data: updateRendezVousDTO});
}
@Delete('/multiple')
// @UseGuards(JwtAuthGuard)
async deleteMultiple(@Body('ids') ids: number[]) {
  return await this.RendezVousService.deleteMultiple(ids);
}
//delete comande
@Delete(':id')
// @UseGuards(JwtAuthGuard)
async delete(@Param('id') id: number): Promise<void> {
  return await this.RendezVousService.delete({id})
}
}




