import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class UpdateAccountDto {
  @ApiProperty({
    description: 'Nome do professor.',
  })
  @ApiPropertyOptional()
  @IsString()
  @MaxLength(80)
  @IsOptional()
  professorName: string;

}
