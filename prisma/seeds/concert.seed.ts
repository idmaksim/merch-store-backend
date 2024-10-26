import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/app/prisma.service';

export async function seedConcerts(prisma: PrismaService) {
  const concerts: Prisma.ConcertCreateInput[] = [
    {
      title: 'Motionless in White',
      images: ['motionless1.jpeg', 'motionless2.jpg', 'motionless3.jpg'],
      date: '2024-12-25',
    },
    {
      title: 'Slipknot',
      images: ['slipknot1.jpg', 'slipknot2.jpg', 'slipknot3.jpeg'],
      date: '2024-12-26',
    },
    {
      title: 'Slaughter to Prevail',
      images: ['slaughter1.jpg', 'slaughter2.jpg', 'slaughter3.jpg'],
      date: '2024-12-27',
    },
    {
      title: 'Bullet for My Valentine',
      images: ['bullet1.jpg', 'bullet2.jpg', 'bullet3.jpg'],
      date: '2024-12-28',
    },
    {
      title: 'Element Eighty',
      images: ['element1.jpg', 'element2.jpg', 'element3.jpg'],
      date: '2024-12-29',
    },
    {
      title: 'Linkin Park',
      images: ['linkin1.jpg', 'linkin2.jpg', 'linkin3.jpg'],
      date: '2024-12-30',
    },
  ];
  for (const concert of concerts) {
    console.log(`Создание концерта: ${concert.title}`);
    await prisma.concert.create({ data: concert });
    console.log(`Концерт ${concert.title} успешно создан.`);
  }
}
