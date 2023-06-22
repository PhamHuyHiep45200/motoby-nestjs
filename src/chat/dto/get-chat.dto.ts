import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class GetChatDto {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  idPersonSend: number;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  idPersonRecipient: number;
}
