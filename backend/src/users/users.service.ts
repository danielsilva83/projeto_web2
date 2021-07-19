import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { CaslAbilityFactory } from '../auth/casl-ability.factory';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { SavePasswordDto } from './dto/save-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection()
    private connection: Connection,

    private usersRepository: UserRepository,

    private caslAbilityFactory: CaslAbilityFactory,

    private mailerService: MailService,
  ) {}

  async findSelf(user: User) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    const requiredUser = await this.usersRepository.findOne(user.id);
    if (abilities.can('read', requiredUser)) {
      return requiredUser;
    }

    return this.forbiddenMessage();
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<void | NotFoundException> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        email: forgotPasswordDto.email,
      });

      const token = this.generateHashFromBcrypt(user.password, true);

      await this.usersRepository.update(user, {
        rememberToken: token,
        updatedAt: new Date(),
      });

      try {
        await this.mailerService.sendForgotPassword(user, token);
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw new NotFoundException('Ooops! E-mail não encontrado...');
    }
  }

  async updatePassword(
    savePasswordDto: SavePasswordDto,
  ): Promise<void | ForbiddenException | BadRequestException> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        rememberToken: savePasswordDto.token,
      });

      const millisecondsNow = new Date().getTime();
      const millisecondsUpdatedAt = user.updatedAt.getTime() + 1800000;

      if (millisecondsNow > millisecondsUpdatedAt) {
        throw new ForbiddenException(
          'Token expirado, solicite uma nova atualização de senha.',
        );
      }

      if (savePasswordDto.newPassword !== savePasswordDto.newPasswordConfirm) {
        throw new BadRequestException('As senhas informadas não coincidem.');
      }

      await this.usersRepository.update(user, {
        password: this.generateHashFromBcrypt(savePasswordDto.newPassword),
        updatedAt: new Date(),
        rememberToken: null,
      });

      try {
        await this.mailerService.sendPasswordUpdated(user);
      } catch (err) {
        throw err;
      }
    } catch (err) {
      throw new NotFoundException('Ooops! Token não encontrado...');
    }
  }

  async findById(user: User, id: number) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    const requiredUser = await this.usersRepository.findOne(id);
    if (abilities.can('read', requiredUser)) {
      return requiredUser;
    }

    return this.forbiddenMessage();
  }

  async find(user: User) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    const requestedUsers = await this.usersRepository.find();
    const sanitized = requestedUsers.filter((requestedUser) =>
      abilities.can('read', requestedUser),
    );

    if (sanitized.length > 0) {
      return sanitized;
    }

    return this.forbiddenMessage();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createAdditionalUser(user: User, _data: any) {
    const abilities = await this.caslAbilityFactory.getUserPermissions(user);

    if (abilities.can('create', 'User')) {
      return await this.usersRepository.find({
        where: { clientEager: user.clientEager },
      });
    }

    return this.forbiddenMessage();
  }

  private forbiddenMessage = () => {
    throw new ForbiddenException(
      'Você não possui permissões suficientes para acessar este endpoint.',
    );
  };

  private generateHashFromBcrypt(value: string): string;
  private generateHashFromBcrypt(value: string, sanitized: boolean): string;
  private generateHashFromBcrypt(
    value: string,
    sanitized = false,
    rounds = 8,
  ): string {
    const hash: string = bcrypt.hashSync(value, bcrypt.genSaltSync(rounds));

    if (!sanitized) {
      return hash;
    }

    // ? This is used to remove $2b$08$ from bcrypt generated hash
    return hash.replace(/^\$\w{2}\$\w{2}\$|\/|\./g, '');
  }
}
