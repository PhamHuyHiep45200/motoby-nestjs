import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma.service';
import { GetChatDto } from './dto/get-chat.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private prisma: PrismaService) {}
  @Get('')
  async getAllChat(@Query() chat: GetChatDto) {
    const admin = await this.prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });
    const data = await this.prisma.message.findMany({
      where: {
        idPersonSend: chat.idPersonSend,
        idPersonRecipient: chat.idPersonRecipient ?? admin.id,
      },
    });
    return { status: 200, data };
  }
}
