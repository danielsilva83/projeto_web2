import { Module } from '@nestjs/common';
import { MailerModule as Mailer } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    Mailer.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: config.get('MAIL_TRANSPORT'),
        defaults: {
          sender: '"Equipe Kognita (GeoEdge)" <admin@kognita.ai>',
          from: '"Equipe Kognita (GeoEdge)" <admin@kognita.ai>',
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
