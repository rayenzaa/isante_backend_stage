import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Delete,
    UseGuards,
  } from '@nestjs/common';
  import { LigneOrdonnance, Prisma } from '@prisma/client';
  import {
    ApiOperation,
    ApiTags,
  } from '@nestjs/swagger';
  import { JwtAuthGuard } from '../auth/auth.jwt.guard';
  import { LigneOrdonnanceService } from './ligne-ordonnance.service';
  
  @ApiTags('LigneOrdonnance')
  @Controller('LigneOrdonnance')
  export class LigneOrdonnanceController {
    constructor(private LigneOrdonnanceService: LigneOrdonnanceService) {}
  
    @Get()
    @UseGuards(JwtAuthGuard)
    async getAll(): Promise<LigneOrdonnance[]> {
      return this.LigneOrdonnanceService.findLigneOrdonnance({});
    }
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'get ligne-ordonnance by id' })
    // @ApiResponse({ type: LigneOrdonnance })
    async getLigneOrdonnanceById(@Param('id') id: number): Promise<LigneOrdonnance> {
      return await this.LigneOrdonnanceService.findLigneOrdonnanceByid({id});
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'créer un ligne-ordonnance ' })
    // @ApiBody({ type: CreateCommandeDto })
    // @ApiCreatedResponse({ type: CommandeEntity })
    async create(
      @Body() createLigneOrdonnanceDTO: Prisma.LigneOrdonnanceCreateInput,
    ): Promise<LigneOrdonnance> {
      return await this.LigneOrdonnanceService.create(createLigneOrdonnanceDTO);
    }  
    //to delete all bon livr
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() updateLigneOrdonnanceDTO: Prisma.LigneOrdonnanceUpdateInput,
    @Param('id') id: number,
  ): Promise<LigneOrdonnance> 
  {
    return await this.LigneOrdonnanceService.updateLigneOrdonnance({where: {id: id}, data: updateLigneOrdonnanceDTO});
  }
  @Delete('/multiple')
  @UseGuards(JwtAuthGuard)
  async deleteMultiple(@Body('ids') ids: number[]) {
    return await this.LigneOrdonnanceService.deleteMultiple(ids);
  }
  //delete comande
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number): Promise<void> {
    return await this.LigneOrdonnanceService.delete({id})
  }
  }
  
  
  
  
  