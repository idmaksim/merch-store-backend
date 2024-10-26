import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data: user });
  }

  async findOneBy(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where });
  }

  async update(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ) {
    return this.prisma.user.update({ where, data });
  }

  async exists(where: Prisma.UserWhereInput) {
    const user = await this.prisma.user.findFirst({
      where,
      select: { uuid: true },
    });
    return !!user;
  }
}
