import { Professor } from 'src/professor/entities/professor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('turmas')
export class Turma {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  professorName: string;
 

  @Column({ name: 'name_turma' })
  turmaName: string;

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

  @OneToMany(() => Professor, (professor) => professor.professorName, { eager: false })
  professors: Professor[];
}
