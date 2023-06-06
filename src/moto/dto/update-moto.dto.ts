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
  licensePates: string;

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
