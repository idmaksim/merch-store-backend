import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { ConcertRepository } from './concert.repository';
import { PrismaService } from '../app/prisma.service';

@Module({
  imports: [ObjectStorageModule],
  controllers: [ConcertController],
  providers: [ConcertService, ConcertRepository, PrismaService],
})
export class ConcertModule {}
