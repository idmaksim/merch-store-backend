import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectStorageService } from './object-storage.service';
import { Response } from 'express';

@ApiTags('Object Storage')
@Controller('object-storage')
export class ObjectStorageController {
  constructor(private readonly objectStorageService: ObjectStorageService) {}

  @Get(':key')
  async findOne(@Param('key') key: string, @Res() res: Response) {
    const file = await this.objectStorageService.findOne(key);
    res.setHeader('Content-Type', 'image/jpeg');
    file.pipe(res);
  }
}
