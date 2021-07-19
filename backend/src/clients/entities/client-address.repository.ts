import { BadRequestException } from '@nestjs/common';
import { EntityRepository, Not, Repository } from 'typeorm';
import { RegisterAccountAddresInfo } from '../dto/register-accout.dto';
import { UpdateAccountAddressDto } from '../dto/update-account-address.dto';
import { ClientAddress } from './client-address.entity';
import { Client } from './client.entity';

@EntityRepository(ClientAddress)
export class ClientAddressesRepository extends Repository<ClientAddress> {
  async createAndSaveWithClient(
    address: RegisterAccountAddresInfo,
    client: Client,
  ) {
    const addressEntity = this.create(address);
    addressEntity.client = client;
    return await this.save(addressEntity);
  }

  async compareAndUpdate(
    address: ClientAddress,
    id: number,
    data: UpdateAccountAddressDto,
  ) {
    const standard = await this.findOne({
      where: {
        isDefault: true,
        id: Not(id),
        isActive: true,
        client: { id: address.client.id },
      },
    });

    const active = await this.findOne({
      where: { isActive: true, id: Not(id), client: { id: address.client.id } },
    });

    const clientAddress = this.create(data);
    clientAddress.id = id;

    try {
      if (clientAddress.isDefault && standard) {
        standard.isDefault = false;
        await this.save(standard);
      }

      if (!clientAddress.isDefault && !standard) {
        clientAddress.isDefault = true;
      }

      if (!active && !clientAddress.isActive) {
        clientAddress.isActive = true;
      }

      await this.save(clientAddress);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
