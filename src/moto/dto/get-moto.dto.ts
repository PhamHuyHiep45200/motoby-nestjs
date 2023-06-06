import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetMotoDto {
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;
}
