import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { Express } from 'express';
import { Readable } from 'stream';

@Injectable()
export class ObjectStorageService {
  constructor(@InjectS3() private readonly s3: S3) {}

  async deleteFile(key: string) {
    try {
      return this.s3.deleteObject({
        Bucket: 'd427eace-merch',
        Key: key,
      });
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  async findOne(key: string) {
    try {
      const file = await this.s3.getObject({
        Bucket: 'd427eace-merch',
        Key: key,
      });
      if (!file.Body) {
        throw new NotFoundException('File not found');
      }
      return file.Body as Readable;
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }

  async uploadFile(file: Express.Multer.File, key: string) {
    return this.s3.putObject({
      Bucket: 'd427eace-merch',
      Key: key,
      Body: file.buffer,
    });
  }
}
