import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PrismaService } from './prisma.service';
import { CreateOrderDto } from './order/dto/create-order.dto';
import * as moment from 'moment';
import { UpdateOrderDto } from './order/dto/update-order.dto';
import { SendChat } from './chat/dto/send-chat.dto';

@WebSocketGateway(5001, { cors: true })
export class ChatGateway {
  constructor(private prisma: PrismaService) {}
  @WebSocketServer()
  server;

  @SubscribeMessage('createOrder')
  async handleCreateOrderNoti(@MessageBody() notify: CreateOrderDto) {
    delete notify.numberDateRental;
    const leaseEndDate = moment(notify.rentalStartDate)
      .add(5, 'days')
      .toISOString();
    const noti = await this.prisma.notify.create({
      data: {
        ...notify,
        leaseEndDate,
        star: 0,
        comment: '',
        deleteFlg: false,
        statusOrder: 'INPROGRESS',
      },
    });
    const data = await this.prisma.notify.findFirst({
      where: {
        id: noti.id,
      },
      include: {
        UserReceiverOrder: true,
        motoOrder: true,
      },
    });
    this.server.emit('notify', data);
  }

  @SubscribeMessage('updateOrder')
  async handleUpdateOrderNoti(
    @MessageBody() updateOrderDto: UpdateOrderDto & { id: number },
  ) {
    await this.prisma.order.update({
      where: { id: updateOrderDto.id },
      data: {
        statusOrder: updateOrderDto.statusOrder,
      },
    });
    const data = await this.prisma.notify.findFirst({
      where: {
        id: updateOrderDto.id,
      },
      include: {
        UserReceiverOrder: true,
        motoOrder: true,
      },
    });
    this.server.emit('notify', data);
  }

  @SubscribeMessage('sendChat')
  async handleSendChat(@MessageBody() senChat: SendChat) {
    const admin = await this.prisma.user.findFirst({
      where: {
        role: 'ADMIN',
      },
    });
    const data = await this.prisma.message.create({
      data: { ...senChat, idPersonRecipient: admin.id, deleteFlg: false },
    });
    this.server.emit('chat', data);
  }
}
