import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MotoService } from './moto.service';
import { ApiTags } from '@nestjs/swagger';
import { GetMotoDto } from './dto/get-moto.dto';
import { CreateMotoDto } from './dto/create-moto.dto';
import { UpdateMotoDto } from './dto/update-moto.dto';
import { UpdateRateMotoDto } from './dto/rate-moto.dto';

@ApiTags('moto')
@Controller('moto')
export class MotoController {
  constructor(private motoService: MotoService) {}
  @Get()
  getMotoAll(@Query() getMotoDto: GetMotoDto) {
    return this.motoService.getMotoAll(getMotoDto);
  }
  @Get('/search')
  getMotoSearch(@Query() getMotoDto: GetMotoDto) {
    return this.motoService.getMotoAllSearch(getMotoDto);
  }
  @Get('/:id')
  getMotoById(@Param('id', ParseIntPipe) id: number) {
    return this.motoService.getMotoById(id);
  }

  @Get('/get-star/order')
  getMotoByStar() {
    return this.motoService.getMotoByStar();
  }

  @Get('/get-paids/order')
  getMotoPaid() {
    return this.motoService.getMotoPaid();
  }

  @Get('/get-moto-new/home')
  getMotoNew() {
    return this.motoService.getMotoNew();
  }

  @Put('/rate/:id')
  rateMoto(
    @Param('id', ParseIntPipe) id: number,
    @Body() rateMotoDto: UpdateRateMotoDto,
  ) {
    return this.motoService.updateRateMoto(id, rateMotoDto);
  }

  @Post()
  createMoto(@Body() createMotoDto: CreateMotoDto) {
    return this.motoService.createMoto(createMotoDto);
  }

  @Put('/:id')
  updateMoto(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMotoDto: UpdateMotoDto,
  ) {
    return this.motoService.updateMoto(id, updateMotoDto);
  }

  @Put('/delete/:id')
  deleteMoto(@Param('id', ParseIntPipe) id: number) {
    return this.motoService.deleteMoto(id);
  }

  @Put('/un-delete/:id')
  unDeleteMoto(@Param('id', ParseIntPipe) id: number) {
    return this.motoService.unDeleteMoto(id);
  }
}
