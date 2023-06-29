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
        motoOrder: {
          include: {
            CategoryMoto: true,
          },
        },
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
    const user = await this.prisma.user.findFirst({
      where: { id: updateOrderDto.idUser },
    });
    const orderId = await this.prisma.order.findFirst({
      where: { id },
      include: {
        motoOrder: true,
      },
    });
    if (user && user.role === 'ADMIN') {
      let update: any = {};
      if (updateOrderDto.statusOrder == 'PAID') {
        const dayNumber = moment(new Date(), 'DD-MM-YYYY').diff(
          moment(orderId.rentalStartDate, 'DD-MM-YYYY'),
          'days',
        );
        let money = 0;
        if (dayNumber === 0 || dayNumber === 1) {
          money = orderId.motoOrder.rentCost;
        } else if (dayNumber > 1) {
          money = orderId.motoOrder.rentCost * dayNumber;
        } else {
          money = 0;
        }
        update = {
          leaseEndDate: new Date(),
          allMoney: money,
        };
      }
      const data: any = await this.prisma.order.update({
        where: { id },
        data: {
          statusOrder: updateOrderDto.statusOrder,
          ...update,
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
}
