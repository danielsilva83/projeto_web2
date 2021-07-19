import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRepository } from './entities/permission.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRepository]), AuthModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService, TypeOrmModule],
})
export class PermissionsModule {}
