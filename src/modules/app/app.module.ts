import { Module } from '@nestjs/common';
import config from 'src/config/config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { S3Module } from 'nestjs-s3';
import { ConcertModule } from '../concert/concert.module';
import { ObjectStorageModule } from '../object-storage/object-storage.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    S3Module.forRootAsync({
      useFactory: (configService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
          },
          region: configService.get('REGION'),
          endpoint: configService.get('S3_ENDPOINT'),
          forcePathStyle: true,
          apiVersion: 'v4',
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ConcertModule,
    ObjectStorageModule,
    ProductModule,
  ],
})
export class AppModule {}
