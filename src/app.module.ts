import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BannerModule } from './banner/banner.module';
import { CategoryModule } from './category/category.module';
import { MotoModule } from './moto/moto.module';
import { Module } from './.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, BannerModule, CategoryModule, MotoModule, Module, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
