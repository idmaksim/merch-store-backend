import { Controller, Get, Param } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Concert')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    return this.concertService.findOne(uuid);
  }

  @Get()
  async findAll() {
    return this.concertService.findAll();
  }
}
