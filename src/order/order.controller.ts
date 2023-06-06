import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  getOrderAll() {
    return this.orderService.getOrderAll();
  }

  @Post()
  createOrder(@Body() createUserDto: CreateOrderDto) {
    return this.orderService.createOrder(createUserDto);
  }

  @Put('/:id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Put('/delete/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }

  @Put('/un-delete/:id')
  unDeleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.unDeleteOrder(id);
  }
}
