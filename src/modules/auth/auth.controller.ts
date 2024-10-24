import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto, SignInUserDto, SignUpUserDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign up' })
  async signUp(@Body() signUpDto: SignUpUserDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in' })
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() signInDto: SignInUserDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() tokenDto: RefreshTokenDto) {
    return this.authService.refresh(tokenDto.refreshToken);
  }
}
