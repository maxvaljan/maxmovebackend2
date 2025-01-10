import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dtos/order.dto';

// Create a local enum
export enum OrderStatus {
  pending = 'pending',
  completed = 'completed',
  cancelled = 'cancelled',
}

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, pickupAddress, dropoffAddress, price, items, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude } =
      createOrderDto;

    return this.prisma.order.create({
      data: {
        customer_id: customerId,
        pickup_address: pickupAddress,
        dropoff_address: dropoffAddress,
        price,
        pickup_latitude: pickupLatitude,
        pickup_longitude: pickupLongitude,
        dropoff_latitude: dropoffLatitude,
        dropoff_longitude: dropoffLongitude,
        items: JSON.stringify(items), // Assuming items are passed as JSON
      },
    });
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: true, driver: true, payment: true },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    return order;
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const validStatuses = Object.values(OrderStatus);
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}`);
    }

    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    return order;
  }

  async getAllOrders(
    status?: OrderStatus,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ orders: Order[]; total: number }> {
    const skip = (page - 1) * limit;
    const filter = status ? { status } : {};
  
    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where: filter,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.order.count({ where: filter }),
    ]);
  
    return { orders, total }; // Ensure this always returns a value
  }
  
  
}