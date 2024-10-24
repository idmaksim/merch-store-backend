import { Module } from '@nestjs/common';
import { ObjectStorageService } from './object-storage.service';
import { ObjectStorageController } from './object-storage.controller';

@Module({
  providers: [ObjectStorageService],
  exports: [ObjectStorageService],
  controllers: [ObjectStorageController],
})
export class ObjectStorageModule {}
