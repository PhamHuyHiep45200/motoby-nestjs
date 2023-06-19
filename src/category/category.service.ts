import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async getCategoryAll(getCategoryDto: GetCategoryDto) {
    const data = await this.prisma.category.findMany({
      where: {
        name: {
          contains: getCategoryDto.name,
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return {
      status: 200,
      data,
    };
  }
  async getCategory(getCategoryDto: GetCategoryDto) {
    const data = await this.prisma.category.findMany({
      where: {
        deleteFlg: false,
        name: {
          contains: getCategoryDto.name,
        },
      },
      include: {
        Moto: {
          include: {
            Order: {
              where: {
                statusOrder: 'PAID',
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return {
      status: 200,
      data,
    };
  }
  async getCategoryById(id: number) {
    const data = await this.prisma.category.findFirstOrThrow({
      where: {
        deleteFlg: false,
        id,
      },
      include: {
        Moto: {
          include: {
            Order: {
              where: {
                statusOrder: 'PAID',
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
    return {
      status: 200,
      data,
    };
  }
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const data = await this.prisma.category.create({
      data: { ...createCategoryDto, deleteFlg: false },
    });
    return { status: 200, data };
  }
  async updateCategory(
    id_category: number,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const data = await this.prisma.category.update({
      where: { id: id_category },
      data: { ...updateCategoryDto },
    });
    return { status: 200, data };
  }
  async deleteCategory(id_category: number) {
    const data = await this.prisma.category.update({
      where: { id: id_category },
      data: { deleteFlg: true },
    });
    return { status: 200, data };
  }
  async unDeleteCategory(id_category: number) {
    const data = await this.prisma.category.update({
      where: { id: id_category },
      data: { deleteFlg: false },
    });
    return { status: 200, data };
  }
}
