import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/entities/user.repository';
import { UsersService } from '../users/users.service';
import { CaslAbilityFactory } from './casl-ability.factory';
import { PermissionRepository } from '../permissions/entities/permission.repository';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLb2duaXRhIiwiaWF0IjoxNjIzNzE2Njg0LCJleHAiOjE2NTUyNTI2ODgsImF1ZCI6Imh0dHBzOi8va29nbml0YS5haSIsInN1YiI6ImRldi5sYWJAa29nbml0YS5haSIsIkZpcnN0TmFtZSI6IklhZ28iLCJMYXN0TmFtZSI6IkJyYWdhIiwiRW1haWwiOiJpYWdvLmNhbGF6YW5zQGtvZ25pdGEuYWkiLCJSb2xlIjoiTWFuYWdlciJ9.nCPJu2EOG5--RiPSMWM3VrIU277_ren5w_wCsy8O7_M',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository, PermissionRepository]),
    MailModule,
  ],
  providers: [AuthService, JwtStrategy, UsersService, CaslAbilityFactory],
  exports: [
    AuthService,
    CaslAbilityFactory,
    JwtStrategy,
    PassportModule,
    TypeOrmModule,
  ],
})
export class AuthModule {}

/**
 * ! JWT Token
 * 
 * Claim Set: {
    "iss": "Kognita",
    "iat": 1623716684,
    "exp": 1655252688,
    "aud": "https://kognita.ai",
    "sub": "dev.lab@kognita.ai",
    "FirstName": "Iago",
    "LastName": "Braga",
    "Email": "iago.calazans@kognita.ai",
    "Role": "Manager"
}
 * 
 * HS256 Key: B4AADF8C594A75FFF76BA6C3E93A3
 * 
 * JWT: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLb2duaXRhIiwiaWF0IjoxNjIzNzE2Njg0LCJleHAiOjE2NTUyNTI2ODgsImF1ZCI6Imh0dHBzOi8va29nbml0YS5haSIsInN1YiI6ImRldi5sYWJAa29nbml0YS5haSIsIkZpcnN0TmFtZSI6IklhZ28iLCJMYXN0TmFtZSI6IkJyYWdhIiwiRW1haWwiOiJpYWdvLmNhbGF6YW5zQGtvZ25pdGEuYWkiLCJSb2xlIjoiTWFuYWdlciJ9.nCPJu2EOG5--RiPSMWM3VrIU277_ren5w_wCsy8O7_M
 */
