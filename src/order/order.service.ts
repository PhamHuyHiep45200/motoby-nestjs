import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import * as moment from 'moment';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async getOrderAll() {
    const data = await this.prisma.order.findMany({
      // where: {
      //   deleteFlg: false,
      // },
      include: {
        motoOrder: true,
        UserReceiverOrder: true,
      },
    });
    return { status: 200, data };
  }
  async getOrderById(id: number) {
    const data = await this.prisma.order.findMany({
      where: {
        idUserReceiver: id,
        deleteFlg: false,
      },
      include: {
        motoOrder: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { status: 200, data };
  }
  async createOrder(createOrderDto: CreateOrderDto) {
    const motoOrder = await this.prisma.moto.findMany({
      where: {
        id: createOrderDto.idMoto,
      },
      include: {
        Order: {
          where: {
            statusOrder: 'RECEIVED',
          },
        },
      },
    });
    const moto = await this.prisma.moto.findMany({
      where: {
        id: createOrderDto.idMoto,
      },
    });
    if (motoOrder >= moto) {
      const leaseEndDate = moment(createOrderDto.rentalStartDate)
        .add(5, 'days')
        .toISOString();
      delete createOrderDto.numberDateRental;
      const data = await this.prisma.order.create({
        data: {
          ...createOrderDto,
          leaseEndDate,
          star: 0,
          comment: '',
          deleteFlg: false,
          statusOrder: 'INPROGRESS',
        },
      });
      const statusSteps = 'RECEIVED';
      return { status: 200, data: { ...data, statusSteps } };
    } else {
      return { status: 400 };
    }
  }
  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const user = this.prisma.user.findFirst({
      where: { id: updateOrderDto.idUser },
    });
    if (user && (await user).role === 'ADMIN') {
      const data: any = await this.prisma.order.update({
        where: { id },
        data: {
          statusOrder: updateOrderDto.statusOrder,
        },
      });
      if (updateOrderDto.statusOrder === 'RECEIVED') {
        data.statusSteps = 'PAID';
      }
      return { status: 200, data };
    } else {
      return { message: 'Bạn không có quyền thực hiện hành vi này' };
    }
  }
  // async deleteOrder(id: number) {
  //   const data = await this.prisma.order.update({
  //     where: { id },
  //     data: {
  //       deleteFlg: true,
  //     },
  //   });
  //   return { status: 200, data };
  // }
  // async unDeleteOrder(id: number) {
  //   const data = await this.prisma.order.update({
  //     where: { id },
  //     data: {
  //       deleteFlg: false,
  //     },
  //   });
  //   return { status: 200, data };
  // }
}
