import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString, Matches, MinLength } from 'class-validator';

export class RegisterAccountAddresInfo {
  @ApiProperty()
  street: string;
  @ApiProperty()
  number: number;
  @ApiProperty()
  complement: string;
  @ApiProperty()
  neighborhood: string;
  @ApiProperty()
  zipcode: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  isDefault: boolean;
}

export class RegisterAccountDto {
  @ApiProperty({ required: true })
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;


  @ApiProperty({
    required: true,
    description: 'Nome do professpr.',
  })
  professorName: string;


  @ApiProperty({ required: true })
  @IsString({ message: 'O e-mail precisa ser do tipo texto.' })
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
    message: 'O e-mail informado não é um e-mail válido.',
  })
  email: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'A senha precisa ser do tipo texto.' })
  @MinLength(6, { message: 'A senha precisa de no mínimo 6 caracteres.' })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm, {
    message:
      'A senha precisa ser composta de pelo menos uma letra minúscula, uma letra maiúscula e um número.',
  })
  password: string;
}
