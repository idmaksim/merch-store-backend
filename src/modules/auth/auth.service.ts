import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import { SignUpUserDto, SignInUserDto } from './dto';
import { PasswordService } from '../password/password.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly passwordService: PasswordService,
  ) {}

  async signUp(userDto: SignUpUserDto) {
    this.logger.log(
      `Начало регистрации пользователя с email: ${userDto.email}`,
    );
    const { uuid, email } = await this.userService.create(userDto);
    this.logger.log(
      `Пользователь зарегистрирован с UUID: ${uuid} и email: ${email}`,
    );
    const accessToken = await this.tokenService.generateAccessToken(uuid);
    const refreshToken = await this.tokenService.generateRefreshToken(uuid);
    this.logger.log(`Токены сгенерированы для пользователя с UUID: ${uuid}`);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(userDto: SignInUserDto) {
    this.logger.log(`Начало входа пользователя с email: ${userDto.email}`);
    const user = await this.userService.findOneByEmail(userDto.email);
    this.logger.log(
      `Пользователь найден с UUID: ${user.uuid} и email: ${user.email}`,
    );
    const isPasswordValid = await this.passwordService.comparePassword(
      userDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const accessToken = await this.tokenService.generateAccessToken(user.uuid);
    const refreshToken = await this.tokenService.generateRefreshToken(
      user.uuid,
    );
    this.logger.log(
      `Токены сгенерированы для пользователя с UUID: ${user.uuid}`,
    );
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refresh(refreshToken: string) {
    this.logger.log(`Начало обновления токена`);
    const payload = await this.tokenService.verifyRefreshToken(refreshToken);
    this.logger.log(`Токен обновлен для пользователя с UUID: ${payload.uuid}`);
    const newAccessToken = await this.tokenService.generateAccessToken(
      payload.uuid,
    );
    const user = await this.userService.findOneByUuid(payload.uuid);
    this.logger.log(
      `Новый токен сгенерирован для пользователя с UUID: ${payload.uuid}`,
    );
    return { accessToken: newAccessToken, user };
  }
}
