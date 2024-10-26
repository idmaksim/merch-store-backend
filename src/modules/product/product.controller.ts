import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { FindManyProductDto } from './dto/product.find-many.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Post()
  async findMany(@Body() body: FindManyProductDto) {
    return this.productService.findMany(body.uuids);
  }

  @Get('recommend')
  async findRecommend() {
    return this.productService.findRecommend();
  }
}
