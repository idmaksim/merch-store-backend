import { Injectable, NotFoundException } from '@nestjs/common';
import { ConcertRepository } from './concert.repository';

@Injectable()
export class ConcertService {
  constructor(private readonly concertRepository: ConcertRepository) {}

  async findAll() {
    const concerts = await this.concertRepository.findAll();
    if (!concerts) {
      throw new NotFoundException('Concerts not found');
    }
    return concerts;
  }

  async findMany(uuids: string[]) {
    const concerts = await this.concertRepository.findMany(uuids);
    if (!concerts) {
      throw new NotFoundException('Concerts not found');
    }
    return concerts;
  }
}
