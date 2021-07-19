import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  Unique,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Role } from '../../permissions/entities/role.entity';
import { Client } from '../../clients/entities/client.entity';
// @ts-ignore
import * as bcrypt from 'bcrypt';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { TicketComment } from '../../tickets/entities/ticket-comment.entity';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

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

  @Column({ name: 'last_login', type: 'timestamp', nullable: true })
  lastLogin?: Date;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  password: string;

  @Column({ name: 'email_verified_at', type: 'timestamp', nullable: true })
  emailVerifiedAt?: Date;

  @Column({ name: 'remember_token', type: 'varchar', nullable: true })
  rememberToken?: string;

  @Column({ nullable: true })
  settings?: string;

  @Column({ name: 'is_active', default: 1 })
  isActive: boolean;

  @ManyToOne(() => Role, (roles) => roles.users, { eager: true })
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  roleEager: Role;

  @ManyToOne(() => Client, (client) => client.users, { eager: true })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  clientEager: Client;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => Ticket, (ticket) => ticket.operator)
  ticketOperator: Ticket[];

  @OneToMany(() => TicketComment, (ticketComment) => ticketComment.user)
  comments: TicketComment[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, 8);
    return hash === this.password;
  }

  toJSON() {
    // delete this.password;
    const { password, ...rest } = this
    return rest;
  }
}
