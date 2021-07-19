import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthCredentialsDto {
  @ApiProperty({ required: true })
  @IsEmail(
    { require_tld: false },
    { message: 'O e-mail informado não é um e-mail válido.' },
  )
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
