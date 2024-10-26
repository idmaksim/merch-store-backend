import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { JwtPayload } from '../auth/decorators/jwt-payload.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserUpdateDto } from './dto/user.update.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user' })
  async update(@JwtPayload() user: User, @Body() dto: UserUpdateDto) {
    return this.userService.update(user.uuid, dto);
  }

  @Get('self')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  async getSelf(@JwtPayload() user: User) {
    return user;
  }
}
