import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('professors')
export class Professor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'professor_name' })
  professorName: string;
 

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

  @OneToMany(() => User, (user) => user.professorEager, { eager: false })
  users: User[];
}
