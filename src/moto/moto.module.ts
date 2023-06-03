import { Module } from '@nestjs/common';
import { MotoController } from './moto.controller';
import { MotoService } from './moto.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [MotoController],
  providers: [MotoService],
  imports: [PrismaModule],
})
export class MotoModule {}
