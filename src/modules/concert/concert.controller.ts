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

  @Post()
  @ApiBody({ type: ConcertCreateDto })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ConcertCreateDto,
  ) {
    return this.concertService.create(file, body);
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: string) {
    return this.concertService.delete(uuid);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    return this.concertService.findOne(uuid);
  }

  @Get()
  async findAll() {
    return this.concertService.findAll();
  }
}
