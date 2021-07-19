import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
@UseGuards(AuthGuard())
@ApiTags('permissions')
@ApiBearerAuth()
export class PermissionsController {
  constructor(public service: PermissionsService) {}

  @Get()
  async findAll() {
    return { response: 'Teste' };
  }
}
