import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class FindAllProductDto {
  @ApiProperty()
  @IsBoolean()
  isCap: boolean;

  @ApiProperty()
  @IsBoolean()
  isTShirt: boolean;
}
