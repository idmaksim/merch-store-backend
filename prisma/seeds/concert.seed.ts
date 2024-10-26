import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/modules/app/prisma.service';

export async function seedConcerts(prisma: PrismaService) {
  const concerts: Prisma.ConcertCreateInput[] = [
    {
      title: 'Motionless in White',
      images: [
        'concert/motionless1.jpeg',
        'concert/motionless2.jpg',
        'concert/motionless3.jpg',
      ],
      date: '2024-12-25',
      place: 'Калифорния',
      price: 5600,
    },
    {
      title: 'Slipknot',
      images: [
        'concert/slipknot1.jpg',
        'concert/slipknot2.jpg',
        'concert/slipknot3.jpeg',
      ],
      date: '2024-12-26',
      place: 'Техас',
      price: 5300,
    },
    {
      title: 'Slaughter to Prevail',
      images: [
        'concert/slaughter1.jpg',
        'concert/slaughter2.jpg',
        'concert/slaughter3.jpg',
      ],
      date: '2024-12-27',
      place: 'Флорида',
      price: 7600,
    },
    {
      title: 'Bullet for My Valentine',
      images: [
        'concert/bullet1.jpg',
        'concert/bullet2.jpg',
        'concert/bullet3.jpg',
      ],
      date: '2024-12-28',
      place: 'Нью-Йорк',
      price: 8900,
    },
    {
      title: 'Element Eighty',
      images: [
        'concert/element1.jpg',
        'concert/element2.jpg',
        'concert/element3.jpg',
      ],
      date: '2024-12-29',
      place: 'Иллинойс',
      price: 4700,
    },
    {
      title: 'Linkin Park',
      images: [
        'concert/linkin1.jpg',
        'concert/linkin2.jpg',
        'concert/linkin3.jpg',
      ],
      date: '2024-12-30',
      place: 'Пенсильвания',
      price: 12000,
    },
  ];
  for (const concert of concerts) {
    console.log(`Создание концерта: ${concert.title}`);
    await prisma.concert.create({ data: concert });
    console.log(`Концерт ${concert.title} успешно создан.`);
  }
}
