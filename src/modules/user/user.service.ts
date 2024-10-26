import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpUserDto } from '../auth/dto';
import { PasswordService } from '../password/password.service';
import { UserUpdateDto } from './dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async update(uuid: string, userDto: UserUpdateDto) {
    const user = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (user && uuid !== user.uuid) {
      throw new ConflictException('User with this email already exists');
    }
    return this.userRepository.update({ uuid }, userDto);
  }

  async create(user: SignUpUserDto) {
    const exists = await this.userRepository.exists({
      email: user.email,
    });
    if (exists) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await this.passwordService.hashPassword(
      user.password,
    );
    return this.userRepository.create({
      ...user,
      password: hashedPassword,
    });
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByUuid(uuid: string) {
    const user = await this.userRepository.findOneBy({ uuid });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
