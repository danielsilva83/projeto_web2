import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { ProfessorService } from './professor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorRepository } from './entities/professor.repository';
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
export class ProfessorModule {
  constructor(private connection: Connection) {}
}
