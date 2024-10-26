import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllProductDto {
  @ApiProperty()
  @IsBoolean()
  isCap: boolean;

  @ApiProperty()
  @IsBoolean()
  isTShirt: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceFrom?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  priceTo?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;
}
