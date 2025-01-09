import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service'; // Use the PrismaService
import { Order } from '@prisma/client'; // Import the Order type

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(customerId: string, items: any): Promise<Order> {
    return this.prisma.order.create({
      data: {
        customerId,
        items: JSON.stringify(items), // Store items as JSON
      },
    });
  }

  async getOrderById(orderId: string): Promise<Order> {
    return this.prisma.order.findUnique({
      where: { id: orderId },
    });
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async getAllOrders(status?: string): Promise<Order[]> {
    const filter = status ? { status } : {};
    return this.prisma.order.findMany({
      where: filter,
    });
  }
}
