import { Category, Prisma } from '@prisma/client';
import { PrismaService } from '../../src/modules/app/prisma.service';

export async function seedProducts(prisma: PrismaService) {
  const products: Prisma.ProductCreateInput[] = [
    {
      title: 'Футболка Motionless in White',
      price: 1200,
      category: Category.T_SHIRTS,
      image: 'prod-motionless.jpg',
    },
    {
      title: 'Футболка Slipknot',
      price: 4200,
      category: Category.T_SHIRTS,
      image: 'prod-slipknot.jpg',
    },
    {
      title: 'Кепка Slipknot',
      price: 1600,
      category: Category.CAPS,
      image: 'prod-slipknot-cap.jpg',
    },
    {
      title: 'Футболка Slaughter to Prevail',
      price: 1500,
      category: Category.T_SHIRTS,
      image: 'prod-slaughter.jpg',
    },
    {
      title: 'Футблока Bull et for My Valentine',
      price: 1800,
      category: Category.T_SHIRTS,
      image: 'prod-bullet.jpg',
    },
    {
      title: 'Кепка Linkin Park Символ',
      price: 1300,
      category: Category.CAPS,
      image: 'prod-linkin1.jpeg',
    },
    {
      title: 'Кепка Linkin Park',
      price: 1400,
      category: Category.CAPS,
      image: 'prod-linkin2.jpg',
    },
  ];
  for (const product of products) {
    console.log(`Создание товара: ${product.title}`);
    await prisma.product.create({ data: product });
    console.log(`Товар ${product.title} успешно создан.`);
  }
}