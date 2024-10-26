import { PrismaService } from 'src/modules/app/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ConcertRepository {
  constructor(private readonly prisma: PrismaService) {}

  async exists(where: Prisma.ConcertWhereUniqueInput) {
    const concert = await this.prisma.concert.findUnique({
      where,
      select: {
        uuid: true,
      },
    });
    return !!concert;
  }

  async findAll() {
    return this.prisma.concert.findMany();
  }
}
