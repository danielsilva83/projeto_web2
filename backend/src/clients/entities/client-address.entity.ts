import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Client } from './client.entity';

@Entity('client_addresses')
export class ClientAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ type: 'varchar', length: 50 })
  complement: string;

  @Column()
  neighborhood: string;

  @Column({
    type: 'varchar',
    length: 8,
    comment: 'the zipcode must have only numbers',
  })
  zipcode: string;

  @Column()
  city: string;

  @Column({ type: 'varchar', length: 2 })
  state: string;

  @Column({ name: 'is_default', type: 'boolean' })
  isDefault: boolean;

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

  @ManyToOne(() => Client, (client) => client.addresses)
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: Client;
}
