import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class SavePasswordDto {
  @ApiProperty({ required: true })
  @IsString({ message: 'Token inválido.' })
  token: string;

  @ApiProperty({ required: true })
  @MinLength(6, { message: 'A senha precisa de no mínimo 6 caracteres.' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm, {
    message:
      'A senha precisa ser composta de pelo menos uma letra minúscula, uma letra maiúscula e um número.',
  })
  newPassword: string;

  @ApiProperty({ required: true })
  @MinLength(6, { message: 'A senha precisa de no mínimo 6 caracteres.' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm, {
    message:
      'A senha precisa ser composta de pelo menos uma letra minúscula, uma letra maiúscula e um número.',
  })
  newPasswordConfirm: string;
}
