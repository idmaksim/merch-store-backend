import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findMany(uuids: string[]) {
    return this.prisma.product.findMany({ where: { uuid: { in: uuids } } });
  }
}
