import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ObjectStorageService } from '../object-storage/object-storage.service';
import { Express } from 'express';
import { ConcertCreateDto } from './dto/concert.create.dto';
import { ConcertRepository } from './concert.repository';
import { generateUrl } from './utils';

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
