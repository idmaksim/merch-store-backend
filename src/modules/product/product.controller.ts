import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { FindManyProductDto } from './dto/product.find-many.dto';
import { FindAllProductDto } from './dto/product.find-all.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async findAll(@Body() body: FindAllProductDto) {
    return this.productService.findAll(body);
  }

  @Post('uuids')
  async findMany(@Body() body: FindManyProductDto) {
    return this.productService.findMany(body.uuids);
  }

  @Get('recommend')
  async findRecommend() {
    return this.productService.findRecommend();
  }
}
