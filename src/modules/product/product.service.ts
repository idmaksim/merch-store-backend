import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ConcertService } from '../concert/concert.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly concertService: ConcertService,
  ) {}

  async findRecommend() {
    const products = await this.productRepository.findAll();
    const productsUuids = products.map((product) => product.uuid);
    const productsToGet = productsUuids.reduce((acc, uuid) => {
      if (Math.round(Math.random()) && acc.length < 4) {
        acc.push(uuid);
      }
      return acc;
    }, []);
    return this.findMany(productsToGet);
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findMany(uuids: string[]) {
    const products = await this.productRepository.findMany(uuids);
    const concerts = await this.concertService.findMany(uuids);
    return [...products, ...concerts];
  }
}
