import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ConcertService } from '../concert/concert.service';
import { FindAllProductDto } from './dto/product.find-all.dto';
import { Category } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly concertService: ConcertService,
  ) {}

  async findRecommend() {
    const products = await this.productRepository.findAll({});
    const productsUuids = products.map((product) => product.uuid);
    const productsToGet = productsUuids.reduce((acc, uuid) => {
      if (Math.round(Math.random()) && acc.length < 4) {
        acc.push(uuid);
      }
      return acc;
    }, []);
    return this.findMany(productsToGet);
  }

  async findAll(body: FindAllProductDto) {
    if (!body.isCap && !body.isTShirt) {
      return [];
    }
    const filters: any = {
      category:
        body.isCap && body.isTShirt
          ? undefined
          : body.isCap
            ? Category.CAPS
            : Category.T_SHIRTS,
    };
    if (body.priceFrom !== undefined) {
      filters.price = { ...filters.price, gte: body.priceFrom };
    }
    if (body.priceTo !== undefined) {
      filters.price = { ...filters.price, lte: body.priceTo };
    }
    if (body.title) {
      filters.title = { contains: body.title, mode: 'insensitive' };
    }
    return this.productRepository.findAll(filters);
  }

  async findMany(uuids: string[]) {
    const products = await this.productRepository.findMany(uuids);
    const concerts = await this.concertService.findMany(uuids);
    return [...products, ...concerts];
  }
}
