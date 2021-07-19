import { BadRequestException, Body, Param, Put, Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ClientsService } from './clients.service';

import { RegisterAccountDto } from './dto/register-accout.dto';
import { UpdateAccountAddressDto } from './dto/update-account-address.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('clients')
export class ClientsController {
  constructor(public clientsService: ClientsService) {}

  @UseGuards(AuthGuard())
  @ApiTags('clients')
  @ApiBearerAuth()
  @Get()
  async all(
    @GetUser() user: User,
    @Query('name') name: string,
    @Query('date') date: string,
    @Query('status') status: number,
  ) {
    return await this.clientsService.find(user, name, date, status);
  }

  @UseGuards(AuthGuard())
  @ApiTags('clients')
  @ApiBearerAuth()
  @Get('find/:id')
  async findOne(@Param('id') id: number, @GetUser() user: User) {
    return await this.clientsService.findById(user, id);
  }

  @UseGuards(AuthGuard())
  @ApiTags('clients')
  @ApiBearerAuth()
  @Put('update/:id')
  async updateOne(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() data: UpdateAccountDto,
  ) {
    return await this.clientsService.updateById(user, id, data);
  }

  @UseGuards(AuthGuard())
  @ApiTags('clients')
  @ApiBearerAuth()
  @Put('address/update/:id')
  async updateOneAddress(
    @Param('id') id: number,
    @GetUser() user: User,
    @Body() data: UpdateAccountAddressDto,
  ) {
    if (typeof id !== 'number') {
      id = +id;

      if (typeof id !== 'number') {
        throw new BadRequestException('ID inválido!');
      }
    }

    return await this.clientsService.updateAddressById(user, id, data);
  }

  @Post('register')
  @ApiTags('clients')
  async register(@Body() data: RegisterAccountDto) {
    return await this.clientsService.register(data);
  }
}
