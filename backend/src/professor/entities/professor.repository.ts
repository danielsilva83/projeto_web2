import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { RegisterAccountDto } from '../dto/register-accout.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Professor } from './professor.entity';

@EntityRepository(Professor)
export class ProfessorRepository extends Repository<Professor> {
  async createAndSave(data: RegisterAccountDto): Promise<Professor> {
    const professorEntity = this.create(data);

    try {
      return await this.save(professorEntity);
    } catch (err) {
      if (err.code === 1062) {
        throw new ConflictException(
          'Já existe um professor com este nome em nosso banco de dados.',
        );
      }

      throw new ServiceUnavailableException();
    }
  }

  async compareAndUpdate(professor: Professor, data: UpdateAccountDto) {
    if (!data) {
      throw new ForbiddenException(
        'Não foram definidos campos para serem atualizados.',
      );
    }

    if (!professor) {
      throw new ForbiddenException('Professor inválido!');
    }

  }

  async getAllClients(name: string, date: string, status: number) {
    const query = this.createQueryBuilder('professor').select([
      'professor.id',
      'professor.professorName',
      'professor.createdAt',
      'professor.isActive',
    ]);

    if (name) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('professor.professorName LIKE :name', {
            name: `%${name}%`,
          });
        }),
      );
    }

    if (date) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('professor.createdAt LIKE :date', {
            date: `%${date}%`,
          });
        }),
      );
    }

    if (status) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('professor.isActive = :status', {
            status: status,
          });
        }),
      );
    }

    return query.getMany();
  }
}
