import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, Length } from 'class-validator';

export class UpdateAccountAddressDto {
  @ApiPropertyOptional()
  @IsOptional()
  street: string;

  @ApiPropertyOptional()
  @IsOptional()
  number: number;

  @ApiPropertyOptional()
  @IsOptional()
  complement: string;

  @ApiPropertyOptional()
  @IsOptional()
  neighborhood: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(8, 8)
  zipcode: string;

  @ApiPropertyOptional()
  city: string;

  @ApiPropertyOptional({ type: 'string', maxLength: 2, minLength: 2 })
  @Length(2, 2, { message: "Utilize a sigla do estado. eg: 'SP'" })
  @IsOptional()
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean({
    message: 'Este valor precisa ser verdadeiro ou falso. eg: true || false',
  })
  isDefault: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({
    message: 'Este valor precisa ser verdadeiro ou falso. eg: true || false',
  })
  isActive: boolean;
}
