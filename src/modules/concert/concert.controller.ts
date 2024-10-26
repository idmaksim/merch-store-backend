import { Controller, Get } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Concert')
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get()
  async findAll() {
    return this.concertService.findAll();
  }
}
