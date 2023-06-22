import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class SendChat {
  @ApiProperty()
  idPersonSend: number;

  @ApiProperty()
  @IsOptional()
  idPersonRecipient?: number;

  @ApiProperty()
  message: string;
}
