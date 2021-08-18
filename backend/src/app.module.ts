import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProfessorModule } from './professor/professor.module';
import { PermissionsModule } from './permissions/permissions.module';
import { Connection, getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TurmasModule } from './turmas/turmas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // * enable .env to global scope
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AuthModule,
    UsersModule,
    ProfessorModule,
    PermissionsModule,
    TurmasModule,
  ],
})
export class AppModule implements NestModule {
  constructor(private connection: Connection) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes('/');
  }
}
