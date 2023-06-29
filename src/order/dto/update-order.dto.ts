import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  idUser: number;

  @ApiProperty()
  @IsOptional()
  statusOrder: StatusOrder;

  @ApiProperty()
  giveCarAddress: string;

  @ApiProperty()
  licensePlates: string;

  @ApiProperty()
  depositPrice: number;
}
