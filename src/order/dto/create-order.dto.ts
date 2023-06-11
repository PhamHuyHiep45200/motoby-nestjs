import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';

export class CreateOrderDto {
  @ApiProperty()
  rentalStartDate: Date;

  @ApiProperty()
  numberDateRental: number;

  @ApiProperty()
  receivingAddress: Date;

  @ApiProperty()
  statusOrder: StatusOrder;

  @ApiProperty()
  idMoto: number;

  @ApiProperty()
  idUserReceiver: number;
}
