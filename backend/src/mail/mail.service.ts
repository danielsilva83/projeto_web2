import { MailerService as Mailer } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(
    private mailerService: Mailer,

    private configService: ConfigService,
  ) {}

  async sendForgotPassword(user: User, token: string) {
    const url = `${this.configService.get(
      'GEOEDGE_FRONT_URL',
    )}/auth/new-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Solicitação de Redefinir sua senha - GeoEdge',
        template: './forgot-password.template.hbs',
        context: {
          // ✏️ filling template brackets with context
          name: `${user.firstName} ${user.lastName}`,
          url,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async sendPasswordUpdated(user: User) {
    const url = `${this.configService.get('GEOEDGE_FRONT_URL')}/auth/login`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Sua senha foi alterada - GeoEdge',
        template: './updated-password.template.hbs',
        context: {
          // ✏️ filling template brackets with context
          name: `${user.firstName} ${user.lastName}`,
          url,
        },
      });
    } catch (err) {
      throw err;
    }
  }
}
