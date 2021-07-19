import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from '../users/entities/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
// @ts-ignore
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);
      user.lastLogin = new Date();
      await this.userRepository.save(user);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'As credenciais informadas não são válidas.',
      );
    }
  }
}
