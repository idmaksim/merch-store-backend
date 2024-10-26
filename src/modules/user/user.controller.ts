import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { JwtPayload } from '../auth/decorators/jwt-payload.decorator';
import { JwtPayloadDto } from '../auth/dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Prisma, User } from '@prisma/client';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('self')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  async getSelf(@JwtPayload() user: User) {
    return user;
  }
}
