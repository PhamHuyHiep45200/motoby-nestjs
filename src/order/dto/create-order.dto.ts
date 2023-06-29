import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty()
  rentalStartDate: Date;

  @ApiProperty()
  numberDateRental: number;

  @ApiProperty()
  allMoney: number;

  @ApiProperty()
  idCard: string;

  @ApiProperty()
  receivingAddress: string;

  @ApiProperty()
  giveCarAddress: string;

  @ApiProperty()
  licensePlates: string;

  @ApiProperty()
  depositPrice: number;

  @ApiProperty()
  statusOrder: StatusOrder;

  @ApiProperty()
  idMoto: number;

  @ApiProperty()
  idUserReceiver: number;
}
