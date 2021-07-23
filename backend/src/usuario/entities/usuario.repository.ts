import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { RegisterAccountDto } from '../dto/register-accout.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Usuario } from './usuario.entity';

@EntityRepository(Usuario)
export class ProfessorRepository extends Repository<Usuario> {
  async createAndSave(data: RegisterAccountDto): Promise<Usuario> {
    const clientEntity = this.create(data);

    try {
      return await this.save(clientEntity);
    } catch (err) {
      if (err.code === 1062) {
        throw new ConflictException(
          'Já existe um cliente com este CNPJ em nosso banco de dados.',
        );
      }

      throw new ServiceUnavailableException();
    }
  }

  async compareAndUpdate(usuario: Usuario, data: UpdateAccountDto) {
    if (!data) {
      throw new ForbiddenException(
        'Não foram definidos campos para serem atualizados.',
      );
    }

    if (!usuario) {
      throw new ForbiddenException('Usuario inválido!');
    }

  }

  async getAllClients(name: string, date: string, status: number) {
    const query = this.createQueryBuilder('usuario').select([
      'usuario.id',
      'usuario.professorName',
      'usuario.createdAt',
      'usuario.isActive',
    ]);

    if (name) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('usuario.professorName LIKE :name', {
            name: `%${name}%`,
          });
        }),
      );
    }

    if (date) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('usuario.createdAt LIKE :date', {
            date: `%${date}%`,
          });
        }),
      );
    }

    if (status) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('usuario.isActive = :status', {
            status: status,
          });
        }),
      );
    }

    return query.getMany();
  }
}
