import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Ordonnance, Prisma } from "@prisma/client";
import { JwtAuthGuard } from "../auth/auth.jwt.guard";
import { OrdonnanceService } from './ordonnance.service';
import { CreateOrdonnanceDto } from "./ordonnance.dto";
@ApiTags('ordonnance')
@Controller('ordonnance')
export class OrdonnanceController {
    constructor(private OrdonnanceService: OrdonnanceService) {}
    @Get()
    // @UseGuards(JwtAuthGuard)
    async getAll(): Promise<Ordonnance[]> {
      return this.OrdonnanceService.findOrdonnance({});
    }
    @Get(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'get ordonnance by id' })
    // @ApiResponse({ type: RendezVous })
    async getRendezvousById(@Param('id', ParseIntPipe) id: number) {
      return await this.OrdonnanceService.findOrdonnanceById({id});
    }
    @Post()
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'créer un ordonnance ' })
    // @ApiBody({ type: CreateCommandeDto })
    // @ApiCreatedResponse({ type: CommandeEntity })
    async create(
      @Body() createOrdonnanceDTO: CreateOrdonnanceDto,
    ) {
      return await this.OrdonnanceService.create(createOrdonnanceDTO);
    }  
    //to delete all bon livr
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() updateOrdonnanceDTO: Prisma.OrdonnanceUpdateInput,
    @Param('id') id: number,
  ): Promise<Ordonnance> 
  {
    return await this.OrdonnanceService.updateOrdonnance({where: {id: id}, data: updateOrdonnanceDTO});
  }
  @Delete('/multiple')
  @UseGuards(JwtAuthGuard)
  async deleteMultiple(@Body('ids') ids: number[]) {
    return await this.OrdonnanceService.deleteMultiple(ids);
  }
  //delete comande
  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.OrdonnanceService.delete({id})
  }
}
  