import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './entities/turmas.entity';
import { TurmasController } from './turmas.controller';
import { TurmasService } from './turmas.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turma])],
  controllers: [TurmasController],
  providers: [TurmasService]
})
export class TurmasModule {}
