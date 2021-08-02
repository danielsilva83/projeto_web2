import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../users/entities/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
  ) {
    super({
      secretOrKey:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJLb2duaXRhIiwiaWF0IjoxNjIzNzE2Njg0LCJleHAiOjE2NTUyNTI2ODgsImF1ZCI6Imh0dHBzOi8va29nbml0YS5haSIsInN1YiI6ImRldi5sYWJAa29nbml0YS5haSIsIkZpcnN0TmFtZSI6IklhZ28iLCJMYXN0TmFtZSI6IkJyYWdhIiwiRW1haWwiOiJpYWdvLmNhbGF6YW5zQGtvZ25pdGEuYWkiLCJSb2xlIjoiTWFuYWdlciJ9.nCPJu2EOG5--RiPSMWM3VrIU277_ren5w_wCsy8O7_M',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user: User = await this.usersRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
