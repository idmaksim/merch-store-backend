import { IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
