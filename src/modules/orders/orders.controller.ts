import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: { customerId: string; items: any }) {
    const { customerId, items } = createOrderDto;
    return this.ordersService.createOrder(customerId, items);
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string) {
    return this.ordersService.getOrderById(orderId);
  }

  @Patch(':id/status')
  async updateOrderStatus(
    @Param('id') orderId: string,
    @Body() updateStatusDto: { status: string },
  ) {
    const { status } = updateStatusDto;
    return this.ordersService.updateOrderStatus(orderId, status);
  }

  @Get()
  async getAllOrders(@Query('status') status?: string) {
    return this.ordersService.getAllOrders(status);
  }
}
