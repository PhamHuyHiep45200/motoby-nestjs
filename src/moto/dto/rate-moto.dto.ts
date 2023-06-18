import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateRateMotoDto {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  star: number;

  @ApiProperty()
  comment: string;
}
