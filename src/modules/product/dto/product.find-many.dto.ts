import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class FindManyProductDto {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  uuids: string[];
}
