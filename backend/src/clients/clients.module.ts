import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsRepository } from './entities/clients.repository';
import { Connection } from 'typeorm';
import { ClientAddressesRepository } from './entities/client-address.repository';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientsRepository, ClientAddressesRepository]),
    UsersModule,
    AuthModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService, TypeOrmModule],
})
export class ClientsModule {
  constructor(private connection: Connection) {}
}
