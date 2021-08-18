import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Turma } from './entities/turmas.entity';

@Injectable()
export class TurmasService extends TypeOrmCrudService<Turma> {
    constructor(@InjectRepository(Turma) repo){
        super(repo)
    }
}
