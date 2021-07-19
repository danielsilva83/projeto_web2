import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { SavePasswordDto } from './dto/save-password.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @ApiTags('users')
  async authUser(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('forgot-password')
  @ApiTags('users')
  async passwordRecovery(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void | NotFoundException> {
    return this.usersService.forgotPassword(forgotPasswordDto);
  }

  @Post('save-password')
  @ApiTags('users')
  async savePassword(
    @Body() savePasswordDto: SavePasswordDto,
  ): Promise<void | NotFoundException> {
    return this.usersService.updatePassword(savePasswordDto);
  }

  @UseGuards(AuthGuard())
  @ApiTags('users')
  @ApiBearerAuth()
  @Get('me')
  async user(@GetUser() user: User) {
    return await this.usersService.findSelf(user);
  }

  @UseGuards(AuthGuard())
  @ApiTags('users')
  @ApiBearerAuth()
  @Get()
  async all(@GetUser() user: User) {
    return await this.usersService.find(user);
  }

  @UseGuards(AuthGuard())
  @ApiTags('users')
  @ApiBearerAuth()
  @Get('find/:id')
  async findOne(@Param('id') id: number, @GetUser() user: User) {
    return await this.usersService.findById(user, id);
  }

  @UseGuards(AuthGuard())
  @ApiTags('users')
  @ApiBearerAuth()
  @Post('create')
  async create(@Body() data, @GetUser() user: User) {
    return await this.usersService.createAdditionalUser(user, data);
  }
}
