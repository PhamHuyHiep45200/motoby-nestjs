import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { ChatController } from './chat.controller';

@Module({
  controllers: [ChatController],
  imports: [PrismaModule],
})
export class ChatModule {}
