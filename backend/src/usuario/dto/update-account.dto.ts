import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    description: 'Nome do usuario.',
  })
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(80)
  @IsOptional()
  professorName: string;

  @ApiPropertyOptional({ maxLength: 11, minLength: 11 })
  @IsOptional()
  @IsString()
  @Length(11, 11, {
    message: 'O documento deve ser do tipo CPF e ter no máximo 11 digitos.',
  })
  personInChargeDocument: string;
}
