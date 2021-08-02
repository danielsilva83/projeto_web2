import { MongoQuery } from '@casl/ability';
import { AnyObject } from '@casl/ability/dist/types/types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Module } from './module.entity';
import { Role } from './role.entity';

@Entity('permissions')
@Unique(['action', 'subject', 'role'])
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @ManyToOne(() => Module, (module) => module.name, { eager: true })
  @JoinColumn({ name: 'subject', referencedColumnName: 'name' })
  subject: Module;

  @Column({ name: 'conditions', type: 'json', nullable: true })
  conditions?: MongoQuery<AnyObject>;

  @ManyToOne(() => Role, (role) => role.permissions, { eager: false })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: Role;
}
