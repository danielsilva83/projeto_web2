import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClientAddress } from './client-address.entity';
import { User } from '../../users/entities/user.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'person_in_charge' })
  personInCharge: string;

  @Column({
    name: 'person_in_charge_document',
    type: 'varchar',
    length: 11,
    comment:
      'the client person in charge document or (cpf) must contains only numbers',
  })
  personInChargeDocument: string;

  @Column({ name: 'is_active', type: 'bool', default: true })
  isActive: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => ClientAddress, (clientAddresse) => clientAddresse.client)
  addresses: ClientAddress[];

  @OneToMany(() => User, (user) => user.clientEager, { eager: false })
  users: User[];
}
