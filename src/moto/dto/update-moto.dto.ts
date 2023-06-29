import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateMotoDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  yearOfManufacture: Date;

  @ApiProperty()
  @IsOptional()
  listThumbnail: string;

  @ApiProperty()
  @IsOptional()
  color: string;

  @ApiProperty()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsOptional()
  licensePates: string;

  @ApiProperty()
  @IsOptional()
  licensePlates: string;

  @ApiProperty()
  @IsOptional()
  discount: number;

  @ApiProperty()
  @IsOptional()
  rentCost: number;

  @ApiProperty()
  @IsOptional()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  idCategory: number;
}
