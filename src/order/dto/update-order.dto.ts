import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty()
  @IsOptional()
  rentalStartDate: Date;

  @ApiProperty()
  @IsOptional()
  leaseEndDate: Date;

  @ApiProperty()
  @IsOptional()
  statusOrder: StatusOrder;

  @ApiProperty()
  @IsOptional()
  idMoto: number;

  @ApiProperty()
  @IsOptional()
  idUserReceiver: number;

  @ApiProperty()
  @IsOptional()
  idUserDeliveryMan: number;
}
