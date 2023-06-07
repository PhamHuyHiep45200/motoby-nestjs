import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
import { CategoryModule } from './category/category.module';
import { MotoModule } from './moto/moto.module';
import { OrderModule } from './order/order.module';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    UserModule,
    BannerModule,
    CategoryModule,
    MotoModule,
    OrderModule,
    UploadModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
