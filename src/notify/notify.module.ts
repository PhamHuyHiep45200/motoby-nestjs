import { Module } from '@nestjs/common';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [NotifyController],
  providers: [NotifyService],
  imports: [PrismaModule],
})
export class NotifyModule {}
