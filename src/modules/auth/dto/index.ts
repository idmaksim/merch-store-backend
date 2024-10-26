import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class SignUpUserDto {
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}

export class SignInUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class JwtPayloadDto {
  uuid: string;
  iat: number;
  exp: number;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}
