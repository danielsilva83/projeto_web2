import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {Crud, CrudController} from '@nestjsx/crud';
import { Turma } from './entities/turmas.entity';
import { TurmasService } from './turmas.service';

@Crud({
    model:{
        type: Turma
    }
})
@ApiTags('turmas')
@Controller('turmas')
export class TurmasController implements CrudController<Turma> {
    constructor(public service: TurmasService){}
}
