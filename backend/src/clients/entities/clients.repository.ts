import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { RegisterAccountDto } from '../dto/register-accout.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { Client } from './client.entity';

@EntityRepository(Client)
export class ClientsRepository extends Repository<Client> {
  async createAndSave(data: RegisterAccountDto): Promise<Client> {
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

  async compareAndUpdate(client: Client, data: UpdateAccountDto) {
    if (!data) {
      throw new ForbiddenException(
        'Não foram definidos campos para serem atualizados.',
      );
    }

    if (!client) {
      throw new ForbiddenException('Cliente inválido!');
    }

    client.personInCharge &&= data.personInCharge;
    client.personInChargeDocument &&= data.personInChargeDocument;

    try {
      await this.save(client);
    } catch (err) {
      if (err.code === 1406) {
        throw new InternalServerErrorException(
          'O campo personInChargeDocument precisa ser do tipo CPF, string e conter apenas números.',
        );
      }

      throw new ServiceUnavailableException();
    }
  }

  async getAllClients(name: string, date: string, status: number) {
    const query = this.createQueryBuilder('clients').select([
      'clients.id',
      'clients.companyName',
      'clients.createdAt',
      'clients.isActive',
      'clients.personInCharge',
      'clients.personInChargeDocument',
    ]);

    if (name) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('clients.companyName LIKE :name', {
            name: `%${name}%`,
          });
        }),
      );
    }

    if (date) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('clients.createdAt LIKE :date', {
            date: `%${date}%`,
          });
        }),
      );
    }

    if (status) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('clients.isActive = :status', {
            status: status,
          });
        }),
      );
    }

    return query.getMany();
  }
}
