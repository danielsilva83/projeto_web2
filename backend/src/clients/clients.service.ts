import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { RegisterAccountDto } from './dto/register-accout.dto';
import { Connection } from 'typeorm';
import { ClientAddressesRepository } from './entities/client-address.repository';
import { ClientsRepository } from './entities/clients.repository';
import { User } from '../users/entities/user.entity';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';
import { ForbiddenException } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UpdateAccountAddressDto } from './dto/update-account-address.dto';
import { UserRepository } from '../users/entities/user.repository';

@Injectable()
export class ClientsService {
  constructor(
    @InjectConnection()
    private connection: Connection,
    private clientsRepository: ClientsRepository,
    private clientAddressesRepository: ClientAddressesRepository,
    private userRepository: UserRepository,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async find(user: User, name: string, date: string, status: number) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    const requiredClients = await this.clientsRepository.getAllClients(
      name,
      date,
      status,
    );

    if (!requiredClients.length)
      throw new NotFoundException('Nenhum cliente encontrado!');

    const sanitized = requiredClients.filter((requiredClient) =>
      abilities.can('read', requiredClient),
    );

    if (sanitized.length > 0) {
      return sanitized;
    }

    return this.forbiddenMessage();
  }

  async findById(user: User, id: number) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    const requiredClient = await this.clientsRepository.findOne(id, {
      relations: ['addresses'],
    });
    if (abilities.can('read', requiredClient)) {
      return requiredClient;
    }

    return this.forbiddenMessage();
  }

  async updateById(user: User, id: number, data: UpdateAccountDto) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    const requiredClient = await this.clientsRepository.findOne(id, {
      relations: ['addresses'],
    });
    if (abilities.can('update', requiredClient)) {
      try {
        return await this.clientsRepository.compareAndUpdate(
          requiredClient,
          data,
        );
      } catch (err) {
        return err;
      }
    }

    return this.forbiddenMessage();
  }

  async updateAddressById(
    user: User,
    id: number,
    data: UpdateAccountAddressDto,
  ) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    const requiredClientAddress = await this.clientAddressesRepository.findOne(
      id,
      { relations: ['client'] },
    );
    if (abilities.can('update', requiredClientAddress)) {
      try {
        return await this.clientAddressesRepository.compareAndUpdate(
          requiredClientAddress,
          id,
          data,
        );
      } catch (err) {
        return err;
      }
    }

    return this.forbiddenMessage();
  }

  async register(data: RegisterAccountDto) {
    const { addresses } = data;
    delete data.addresses;

    const client = await this.clientsRepository.createAndSave(data);

    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      clientEager: client,
    };

    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);

    await Promise.all([
      addresses.map(
        async (address) =>
          await this.clientAddressesRepository.createAndSaveWithClient(
            address,
            client,
          ),
      ),
      ,
    ]);

    return client;
  }

  private forbiddenMessage = () => {
    throw new ForbiddenException(
      'Você não possui permissões suficientes para acessar este endpoint.',
    );
  };
}
