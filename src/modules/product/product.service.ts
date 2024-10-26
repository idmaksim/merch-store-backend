import { Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ConcertService } from '../concert/concert.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly concertService: ConcertService,
  ) {}

  async findAll() {
    return this.productRepository.findAll();
  }

  async findMany(uuids: string[]) {
    const products = await this.productRepository.findMany(uuids);
    const concerts = await this.concertService.findMany(uuids);
    return [...products, ...concerts];
  }
}
