import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetUserDto } from './dto/getUser.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers(getUserDto: GetUserDto) {
    const data = await this.prisma.user.findMany({
      where: {
        email: {
          contains: getUserDto.email,
        },
        name: {
          contains: getUserDto.name,
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        deleteFlg: true,
      },
      orderBy: { updatedAt: 'desc' },
    });
    return {
      status: 200,
      data,
    };
  }
  async getUserById(authUserDto: AuthUserDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { email: authUserDto.email, deleteFlg: false },
    });
    if (user && user.password === authUserDto.password) {
      return { status: 200, data: user };
    } else {
      return { message: 'Vui lòng kiểm tra lại thông tin tài khoản!' };
    }
  }
  async createUser(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (user) {
      return { message: 'Email người dùng đã tồn tại!' };
    }
    const result = await this.prisma.user.create({
      data: { ...createUserDto, role: 'USER', deleteFlg: false },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = result;
    return { status: 200, data };
  }
  async updateUser(updateUserDto: UpdateUserDto, id: number) {
    const data = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return { status: 200, data };
  }
  async deleteUser(idUser: number) {
    let data: any;
    const user = await this.prisma.user.findFirst({
      where: { id: idUser, deleteFlg: false },
    });
    if (user) {
      data = await this.prisma.user.update({
        where: { id: idUser },
        data: { deleteFlg: true },
      });
      return { status: 200, data };
    }
    return { message: 'Người dùng không tồn tại hoặc bị khóa' };
  }
  async unDeleteUser(idUser: number) {
    let data: any;
    const user = await this.prisma.user.findFirst({
      where: { id: idUser, deleteFlg: true },
    });
    if (user) {
      data = await this.prisma.user.update({
        where: { id: idUser },
        data: { deleteFlg: false },
      });
      return { status: 200, data };
    }
    return { message: 'Người dùng không tồn tại hoặc bị khóa' };
  }
}
