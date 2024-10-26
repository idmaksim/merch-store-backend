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

  async findOne(uuid: string) {
    const concert = await this.concertRepository.findOne(uuid);
    if (!concert) {
      throw new NotFoundException('Concert not found');
    }
    return concert;
  }
}
