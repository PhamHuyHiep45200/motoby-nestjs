import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotifyService {
  constructor(private prisma: PrismaService) {}
  async getNotify() {
    const data = await this.prisma.notify.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        UserReceiverOrder: true,
        motoOrder: true,
      },
    });
    return { status: 200, data };
  }
}
