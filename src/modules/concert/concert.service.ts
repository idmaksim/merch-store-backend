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
  constructor(
    private readonly objectStorageService: ObjectStorageService,
    private readonly concertRepository: ConcertRepository,
  ) {}

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

  async create(file: Express.Multer.File, body: ConcertCreateDto) {
    if (!file) {
      throw new BadRequestException(
        'File is required (please, test this in Postman by sending form-data)',
      );
    }
    const imageUrl = await generateUrl(body.title);
    const uploadResult = await this.objectStorageService.uploadFile(
      file,
      imageUrl,
    );
    if (uploadResult.$metadata.httpStatusCode !== 200) {
      throw new BadRequestException('Failed to upload file');
    }
    return this.concertRepository.create(body, imageUrl);
  }

  async delete(uuid: string) {
    const exists = await this.concertRepository.exists({ uuid });
    if (!exists) {
      throw new NotFoundException('Concert not found');
    }
    const deleted = await this.concertRepository.delete(uuid);
    await this.objectStorageService.deleteFile(deleted.imageUrl);
    return deleted;
  }
}
