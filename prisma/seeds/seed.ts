import { PrismaService } from '../../src/modules/app/prisma.service';
import { seedConcerts } from './concert.seed';
async function seed() {
  const prisma = new PrismaService();
  await seedConcerts(prisma);
}

seed();
