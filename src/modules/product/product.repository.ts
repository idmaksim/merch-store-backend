import { Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { FindAllProductDto } from './dto/product.find-all.dto';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(where: Prisma.ProductWhereInput) {
    return this.prisma.product.findMany({
      where,
    });
  }

  async findMany(uuids: string[]) {
    return this.prisma.product.findMany({ where: { uuid: { in: uuids } } });
  }
}
