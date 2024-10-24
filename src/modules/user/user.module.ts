import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './user.repository';
import { PrismaService } from '../app/prisma.service';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [forwardRef(() => AuthModule), PasswordModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService],
})
export class UserModule {}
