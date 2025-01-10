import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  // Create a new booking
  async createBooking(data: any) {
    const { customerId, pickupAddress, dropoffAddress, price, items } = data;

    return await this.prisma.order.create({
      data: {
        customer_id: customerId,
        pickup_address: pickupAddress,
        dropoff_address: dropoffAddress,
        pickup_latitude: data.pickupLatitude,
        pickup_longitude: data.pickupLongitude,
        dropoff_latitude: data.dropoffLatitude,
        dropoff_longitude: data.dropoffLongitude,
        price,
        items,
        status: 'pending', // Default status
      },
    });
  }

  // Get all bookings for a specific user
  async getBookingsByUser(userId: string) {
    return await this.prisma.order.findMany({
      where: { customer_id: userId },
      include: {
        deliveries: true,
        payment: true,
      },
    });
  }

  // Update booking status
  async updateBookingStatus(orderId: string, statusUpdate: any) {
    const { status } = statusUpdate;

    return await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
