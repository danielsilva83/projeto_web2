import { Module } from '@nestjs/common';
import { ProfessorController } from './usuario.controller';
import { ProfessorService } from './usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorRepository } from './entities/usuario.repository';
import { Connection } from 'typeorm';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfessorRepository]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ProfessorController],
  providers: [ProfessorService],
  exports: [ProfessorService, TypeOrmModule],
})
export class UsuarioModule {
  constructor(private connection: Connection) {}
}
