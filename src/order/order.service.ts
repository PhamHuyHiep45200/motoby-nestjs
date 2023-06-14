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
    if (motoOrder < moto) {
      const leaseEndDate = moment(createOrderDto.rentalStartDate)
        .add(5, 'days')
        .toISOString();
      delete createOrderDto.numberDateRental;
      const data = await this.prisma.order.create({
        data: {
          ...createOrderDto,
          leaseEndDate,
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
    const data: any = await this.prisma.order.update({
      where: { id },
      data: updateOrderDto,
    });
    if (updateOrderDto.statusOrder === 'RECEIVED') {
      data.statusSteps = 'PAID';
    }
    return { status: 200, data };
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
