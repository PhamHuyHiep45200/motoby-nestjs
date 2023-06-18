import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetMotoDto } from './dto/get-moto.dto';
import { CreateMotoDto } from './dto/create-moto.dto';
import { UpdateMotoDto } from './dto/update-moto.dto';
import { UpdateRateMotoDto } from './dto/rate-moto.dto';
import { async } from 'rxjs';

@Injectable()
export class MotoService {
  constructor(private prisma: PrismaService) {}
  async getMotoAll(getMotoDto: GetMotoDto) {
    const data = await this.prisma.moto.findMany({
      where: {
        // deleteFlg: false,
        name: {
          contains: getMotoDto.name,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return { status: 200, data };
  }
  async getMotoById(id: number) {
    const motoOrder = await this.prisma.moto.findMany({
      where: { id },
      include: {
        Order: {
          where: {
            statusOrder: 'RECEIVED',
          },
        },
      },
    });
    const data = await this.prisma.moto.findFirstOrThrow({
      where: { id },
    });
    return {
      status: 200,
      data: { ...data, quantityMoto: data.quantity - motoOrder.length },
    };
  }
  async getMotoByStar() {
    const listMotoStar = await this.prisma.moto.findMany({
      include: {
        Order: {
          where: {
            statusOrder: 'PAID',
          },
        },
      },
    });
    const listStar = listMotoStar.map((moto) => {
      return {
        ...moto,
        starMoto:
          moto.Order.reduce((a, b) => {
            if (b.star !== 0) {
              return a + b.star;
            }
            return a;
          }, 0) / moto.Order.length,
      };
    });
    return {
      status: 200,
      data: listStar.sort((a, b) => a.starMoto - b.starMoto).splice(0, 11),
    };
  }
  async getMotoPaid() {
    const listMoto = await this.prisma.moto.findMany({
      include: {
        Order: {
          where: { statusOrder: 'PAID' },
        },
      },
    });
    return {
      status: 200,
      data: listMoto.sort((a, b) => b.Order.length - a.Order.length),
    };
  }
  async updateRateMoto(id: number, rateMotoDto: UpdateRateMotoDto) {
    const data = await this.prisma.order.update({
      where: { id },
      data: rateMotoDto,
    });
    return { status: 200, data };
  }
  async createMoto(createMotoDto: CreateMotoDto) {
    const data = await this.prisma.moto.create({
      data: { ...createMotoDto, deleteFlg: false },
    });
    return { status: 200, data };
  }
  async updateMoto(id: number, updateMotoDto: UpdateMotoDto) {
    const data = await this.prisma.moto.update({
      where: { id },
      data: updateMotoDto,
    });
    return { status: 200, data };
  }
  async deleteMoto(id: number) {
    const data = await this.prisma.moto.update({
      where: { id },
      data: {
        deleteFlg: true,
      },
    });
    return { status: 200, data };
  }
  async unDeleteMoto(id: number) {
    const data = await this.prisma.moto.update({
      where: { id },
      data: {
        deleteFlg: false,
      },
    });
    return { status: 200, data };
  }
}
