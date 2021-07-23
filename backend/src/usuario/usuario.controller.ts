import { BadRequestException, Body, Param, Put, Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ProfessorService } from './usuario.service';

import { RegisterAccountDto } from './dto/register-accout.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('usuario')
export class ProfessorController {
  constructor(public professorService: ProfessorService) {}

  @UseGuards(AuthGuard())
  @ApiTags('usuario')
  @ApiBearerAuth()
  @Get()
  async all(
    @GetUser() user: User,
    @Query('name') name: string,
    @Query('date') date: string,
    @Query('status') status: number,
  ) {
    return await this.professorService.find(user, name, date, status);
  }

  @UseGuards(AuthGuard())
  @ApiTags('usuario')
  @ApiBearerAuth()
  @Get('find/:id')
  async findOne(@Param('id') id: number, @GetUser() user: User) {
    return await this.professorService.findById(user, id);
  }

  @UseGuards(AuthGuard())
  @ApiTags('usuario')
  @ApiBearerAuth()
  @Put('update/:id')
  async updateOne(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() data: UpdateAccountDto,
  ) {
    return await this.professorService.updateById(user, id, data);
  }


  @Post('register')
  @ApiTags('usuario')
  async register(@Body() data: RegisterAccountDto) {
    return await this.professorService.register(data);
  }
}
