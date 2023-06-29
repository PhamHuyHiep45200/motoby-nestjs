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
  @IsOptional()
  allMoney: number;
}
