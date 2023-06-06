import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async getOrderAll() {
    const data = await this.prisma.order.findMany({
      where: {
        deleteFlg: false,
      },
    });
    return { status: 200, data };
  }
  async createOrder(createOrderDto: CreateOrderDto) {
    const data = await this.prisma.order.create({
      data: { ...createOrderDto, deleteFlg: false },
    });
    return { status: 200, data };
  }
  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const data = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
    return { status: 200, data };
  }
  async deleteOrder(id: number) {
    const data = await this.prisma.order.update({
      where: { id },
      data: {
        deleteFlg: true,
      },
    });
    return { status: 200, data };
  }
  async unDeleteOrder(id: number) {
    const data = await this.prisma.order.update({
      where: { id },
      data: {
        deleteFlg: false,
      },
    });
    return { status: 200, data };
  }
}
