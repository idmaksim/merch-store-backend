import { Category } from '@prisma/client';
import { PrismaService } from '../../src/modules/app/prisma.service';
import { seedConcerts } from './concert.seed';
import { seedProducts } from './product.seed';

async function seed() {
  const prisma = new PrismaService();
  await seedConcerts(prisma);
  await seedProducts(prisma);
}

seed();
