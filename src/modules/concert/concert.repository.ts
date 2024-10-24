import { PrismaService } from 'src/modules/app/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConcertCreateDto } from './dto/concert.create.dto';
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

  async findOne(uuid: string) {
    return this.prisma.concert.findUnique({
      where: { uuid },
    });
  }

  async create(data: ConcertCreateDto, imageUrl: string) {
    return this.prisma.concert.create({
      data: {
        ...data,
        imageUrl,
      },
    });
  }

  async delete(uuid: string) {
    return this.prisma.concert.delete({
      where: { uuid },
    });
  }
}
