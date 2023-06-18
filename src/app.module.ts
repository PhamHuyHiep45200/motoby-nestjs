import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
import { CategoryModule } from './category/category.module';
import { MotoModule } from './moto/moto.module';
import { OrderModule } from './order/order.module';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { ChatGateway } from './chat.gateway';

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
  providers: [ChatGateway],
})
export class AppModule {}
