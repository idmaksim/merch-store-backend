import { Module } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { ConcertController } from './concert.controller';
import { ConcertRepository } from './concert.repository';
import { PrismaService } from '../app/prisma.service';

@Module({
  imports: [],
  controllers: [ConcertController],
  providers: [ConcertService, ConcertRepository, PrismaService],
  exports: [ConcertService],
})
export class ConcertModule {}
