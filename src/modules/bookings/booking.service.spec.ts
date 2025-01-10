import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './bookings.service';
import { PrismaService } from '../../common/prisma.service';
import { Prisma, OrderStatus} from '@prisma/client';

describe('BookingService', () => {
  let bookingService: BookingService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingService, PrismaService],
    }).compile();

    bookingService = module.get<BookingService>(BookingService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(bookingService).toBeDefined();
  });

  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const bookingData = {
        customerId: 'customer-id-123',
        pickupAddress: '123 Main St',
        dropoffAddress: '456 Elm St',
        pickupLatitude: 40.7128,
        pickupLongitude: -74.006,
        dropoffLatitude: 40.7306,
        dropoffLongitude: -73.9352,
        price: 100.0,
        items: [{ name: 'Laptop', quantity: 1 }],
      };

      // Prisma-compatible mock data
      const createdBooking = {
        id: 'order-id-123',
        customer_id: bookingData.customerId,
        driver_id: null,
        pickup_address: bookingData.pickupAddress,
        dropoff_address: bookingData.dropoffAddress,
        pickup_latitude: new Prisma.Decimal(bookingData.pickupLatitude),
        pickup_longitude: new Prisma.Decimal(bookingData.pickupLongitude),
        dropoff_latitude: new Prisma.Decimal(bookingData.dropoffLatitude),
        dropoff_longitude: new Prisma.Decimal(bookingData.dropoffLongitude),
        price: new Prisma.Decimal(bookingData.price),
        items: bookingData.items,
        status: OrderStatus.pending,
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Mock Prisma's create method
      jest.spyOn(prismaService.order, 'create').mockResolvedValue(createdBooking);

      // Call the service method
      const result = await bookingService.createBooking(bookingData);

      // Assert
      expect(result).toEqual(createdBooking);

      // Normalize Decimal fields to numbers for comparison
      expect(prismaService.order.create).toHaveBeenCalledWith({
        data: {
          customer_id: bookingData.customerId,
          pickup_address: bookingData.pickupAddress,
          dropoff_address: bookingData.dropoffAddress,
          pickup_latitude: parseFloat(bookingData.pickupLatitude.toString()),
          pickup_longitude: parseFloat(bookingData.pickupLongitude.toString()),
          dropoff_latitude: parseFloat(bookingData.dropoffLatitude.toString()),
          dropoff_longitude: parseFloat(bookingData.dropoffLongitude.toString()),
          price: parseFloat(bookingData.price.toString()),
          items: bookingData.items,
          status: OrderStatus.pending,
        },
      });
    });

    it('should throw an error if booking creation fails', async () => {
      const bookingData = {
        customerId: 'customer-id-123',
        pickupAddress: '123 Main St',
        dropoffAddress: '456 Elm St',
        pickupLatitude: 40.7128,
        pickupLongitude: -74.0060,
        dropoffLatitude: 40.7306,
        dropoffLongitude: -73.9352,
        price: 100.0,
        items: [{ name: 'Laptop', quantity: 1 }],
      };

      // Mock Prisma's create method to throw an error
      jest.spyOn(prismaService.order, 'create').mockRejectedValue(new Error('Database error'));

      // Call the service method and expect an error
      await expect(bookingService.createBooking(bookingData)).rejects.toThrow('Database error');
    });
  });
});
