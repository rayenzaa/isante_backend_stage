import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
import { Prisma, Utilisateur } from '@prisma/client';
import { UtilisateurService } from './utilisateur.service';
import { Utilisateur as UtilisateurEntity } from 'src/generated/prisma-client/utilisateur';
import { JwtAuthGuard } from '../auth/auth.jwt.guard';
import { RegisterUserDTO } from '../auth/auth.dto';
import { updateUserDTO } from './utilisateur-update.dto';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UtilisateurService) {}
  @Get()
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'get all users' })
  @ApiResponse({ type: UtilisateurEntity, isArray: true })
  async getAll(@Request() req): Promise<Utilisateur[]> {
    console.log('req is: ', Object.keys(req)[0]);
    console.log('user is: ', req.user);

    return await this.userService.Utilisateurs({where: {role : {not:"ADMIN"}}});
  }
  @Get(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'get user by id' })
  @ApiResponse({ type: UtilisateurEntity })
  async getUserById(@Param('id') idUtilisateurStr: string): Promise<Utilisateur> {
    const idUtilisateur = parseInt(idUtilisateurStr,10)
    return await this.userService.findUtilisateur({ id: idUtilisateur });
  }
  @Delete('/:id')
  // @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: UtilisateurEntity })
  @ApiOperation({ description: 'delete user by id' })
async deleteUserById(@Param('id', ParseIntPipe) id): Promise<void> {
  await this.userService.deleteUtilisateur({id});
}
  

@Post('register')
async register(@Body() user: RegisterUserDTO): Promise<Utilisateur> {
  console.log(user)
  return this.userService.createUtilisateur(user);
}

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'update user' })
  @ApiResponse({ type: UtilisateurEntity })
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() data: updateUserDTO
  ): Promise<Utilisateur> {
    return this.userService.updateUtilisateur({
      data,
      where: { id},
    });
  }
}
