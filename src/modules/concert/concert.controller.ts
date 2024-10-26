import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ConcertCreateDto } from './dto/concert.create.dto';

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
