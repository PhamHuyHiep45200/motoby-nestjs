import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetMotoDto } from './dto/get-moto.dto';
import { CreateMotoDto } from './dto/create-moto.dto';
import { UpdateMotoDto } from './dto/update-moto.dto';
import { UpdateRateMotoDto } from './dto/rate-moto.dto';

@Injectable()
export class MotoService {
  constructor(private prisma: PrismaService) {}
  async getMotoAll(getMotoDto: GetMotoDto) {
    const data = await this.prisma.moto.findMany({
      where: {
        // deleteFlg: false,
        name: {
          contains: getMotoDto.name,
          mode: 'insensitive',
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return { status: 200, data };
  }
  async getMotoAllSearch(getMotoDto: GetMotoDto) {
    const data = await this.prisma.moto.findMany({
      where: {
        deleteFlg: false,
        name: {
          contains: getMotoDto.name,
          mode: 'insensitive',
        },
      },
      include: {
        Order: {
          where: {
            statusOrder: 'PAID',
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    const listStar = data.map((moto) => {
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
    return { status: 200, data: listStar };
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
    const listMotoStar = await this.prisma.moto.findFirst({
      where: { id },
      include: {
        Order: {
          where: {
            statusOrder: 'PAID',
          },
        },
      },
    });
    const listStar =
      listMotoStar.Order.reduce((a, b) => {
        if (b.star !== 0) {
          return a + b.star;
        }
        return a;
      }, 0) / listMotoStar.Order.filter((e) => e.star !== 0).length;
    const rate = await this.prisma.moto.findFirst({
      where: { id },
      include: {
        Order: {
          where: {
            statusOrder: 'PAID',
            star: {
              not: 0,
            },
          },
          include: {
            UserReceiverOrder: true,
          },
        },
      },
    });
    return {
      status: 200,
      data: {
        ...data,
        quantityMoto: data.quantity - motoOrder.length,
        starMoto: listStar,
        rate: rate.Order,
      },
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
          }, 0) / moto.Order.filter((e) => e.star !== 0).length,
      };
    });
    return {
      status: 200,
      data: listStar.sort((a, b) => b.starMoto - a.starMoto).splice(0, 11),
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
    const listFormat = listMoto.filter((e) => e.Order.length);
    if (listFormat.length) {
      return {
        status: 200,
        data: listFormat.sort((a, b) => b.Order.length - a.Order.length),
      };
    }
    return { status: 200, data: [] };
  }
  async getMotoNew() {
    const data = await this.prisma.moto.findMany({
      where: {
        deleteFlg: false,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return { status: 200, data };
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
