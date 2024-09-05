import { Body, Controller, Delete, Get, Param, ParseArrayPipe, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Medicament, Prisma } from "@prisma/client";
import { JwtAuthGuard } from "../auth/auth.jwt.guard";
import { MedicamentService } from './medicament.service';
import { isNumber } from "class-validator";
@ApiTags('medicament')
@Controller('medicament')
export class MedicamentController {
    constructor(private MedicamentService: MedicamentService) {}
    @Get()
    // @UseGuards(JwtAuthGuard)
    async getAll(): Promise<Medicament[]> {
        return this.MedicamentService.findMedicament({});
    }
    
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'get medicament by id' })
    // @ApiResponse({ type: Medicament })
    async getMedicamentById(@Param('id') id: number): Promise<Medicament> {
      return await this.MedicamentService.findMedicamentByid({id});
    }
    @Post()
    // @UseGuards(JwtAuthGuard)
    @ApiOperation({ description: 'créer un medicament ' })
    // @ApiBody({ type: CreateCommandeDto })
    // @ApiCreatedResponse({ type: CommandeEntity })
    async create(
      @Body() createMedicamentDTO: Prisma.MedicamentCreateInput,
    ): Promise<Medicament> {
      return await this.MedicamentService.create(createMedicamentDTO);
    }  
    //to delete all bon livr
  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  async update(
    @Body() updateMedicamentDTO: Prisma.MedicamentUpdateInput,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Medicament>  
  {
    return await this.MedicamentService.updateMedicament({where: {id: id}, data: updateMedicamentDTO});
  }
  @Delete('/multiple/:ids')
  // @UseGuards(JwtAuthGuard)
  async deleteMultiple( @Param('ids', new ParseArrayPipe({ items: Number, separator: ',' })) ids: number[],) {
    return await this.MedicamentService.deleteMultiple(ids);
  }
  //delete comande
  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    console.log(id)
    return await this.MedicamentService.delete({id})
  }
}
  