import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity('modules')
@Unique(['name'])
export class Module {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Permission, (permissions) => permissions.subject, {
    eager: false,
  })
  permissions: Permission[];
}
