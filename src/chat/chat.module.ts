import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [ChatController],
  imports: [PrismaModule],
})
export class ChatModule {}
