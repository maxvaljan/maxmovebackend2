import { Controller, Get, Post, Body, Param, Query, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dtos/order.dto';
import { Order } from '@prisma/client';
import { OrderStatus } from '@prisma/client';


@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Put(':id/status')
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(id, updateOrderStatusDto.status);
  }

  @Get()
  async getAllOrders(
    @Query('status') status?: OrderStatus, // Ensure status is of the correct type
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.ordersService.getAllOrders(status, Number(page), Number(limit));
  }
}
