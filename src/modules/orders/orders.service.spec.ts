import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../../common/prisma.service';
import { Order, OrderStatus } from '@prisma/client';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockPrismaService = {
  order: {
    create: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
  },
};

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let prismaService: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const dto = {
        customerId: 'customer123',
        pickupAddress: '123 Main St',
        dropoffAddress: '456 Elm St',
        price: 100,
        pickupLatitude: 10.1234,
        pickupLongitude: 20.5678,
        dropoffLatitude: 30.9101,
        dropoffLongitude: 40.1234,
        items: [{ name: 'item1', quantity: 2 }],
        status: OrderStatus.pending, // Add this field
      };

      const createdOrder = { id: 'order123', ...dto };
      prismaService.order.create.mockResolvedValue(createdOrder);

      const result = await ordersService.createOrder(dto);

      expect(result).toEqual(createdOrder);
      expect(prismaService.order.create).toHaveBeenCalledWith({
        data: {
          customer_id: dto.customerId,
          pickup_address: dto.pickupAddress,
          dropoff_address: dto.dropoffAddress,
          price: dto.price,
          pickup_latitude: dto.pickupLatitude,
          pickup_longitude: dto.pickupLongitude,
          dropoff_latitude: dto.dropoffLatitude,
          dropoff_longitude: dto.dropoffLongitude,
          items: JSON.stringify(dto.items),
          status: dto.status,
        },
      });
    });
  });

  describe('getOrderById', () => {
    it('should return an order if found', async () => {
      const orderId = 'order123';
      const foundOrder = { id: orderId, customer_id: 'customer123' };
      prismaService.order.findUnique.mockResolvedValue(foundOrder);

      const result = await ordersService.getOrderById(orderId);

      expect(result).toEqual(foundOrder);
      expect(prismaService.order.findUnique).toHaveBeenCalledWith({
        where: { id: orderId },
        include: { customer: true, driver: true, payment: true },
      });
    });

    it('should throw NotFoundException if order not found', async () => {
      const orderId = 'order123';
      prismaService.order.findUnique.mockResolvedValue(null);

      await expect(ordersService.getOrderById(orderId)).rejects.toThrow(
        new NotFoundException(`Order with ID ${orderId} not found.`),
      );
    });
  });

  describe('updateOrderStatus', () => {
    it('should update the order status', async () => {
      const orderId = 'order123';
      const status = OrderStatus.completed;
      const updatedOrder = { id: orderId, status };
      prismaService.order.update.mockResolvedValue(updatedOrder);

      const result = await ordersService.updateOrderStatus(orderId, status);

      expect(result).toEqual(updatedOrder);
      expect(prismaService.order.update).toHaveBeenCalledWith({
        where: { id: orderId },
        data: { status },
      });
    });

    it('should throw BadRequestException for invalid status', async () => {
      const orderId = 'order123';
      const status = 'invalid_status' as OrderStatus;

      await expect(ordersService.updateOrderStatus(orderId, status)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw NotFoundException if order not found', async () => {
      const orderId = 'order123';
      const status = OrderStatus.completed;
      prismaService.order.update.mockRejectedValue(new NotFoundException());

      await expect(ordersService.updateOrderStatus(orderId, status)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllOrders', () => {
    it('should return paginated orders', async () => {
      const status = OrderStatus.pending;
      const page = 1;
      const limit = 10;
      const orders = [{ id: 'order123', status }];
      const total = 1;

      prismaService.order.findMany.mockResolvedValue(orders);
      prismaService.order.count.mockResolvedValue(total);

      const result = await ordersService.getAllOrders(status, page, limit);

      expect(result).toEqual({ orders, total });
      expect(prismaService.order.findMany).toHaveBeenCalledWith({
        where: { status },
        skip: 0,
        take: limit,
        orderBy: { created_at: 'desc' },
      });
      expect(prismaService.order.count).toHaveBeenCalledWith({
        where: { status },
      });
    });
  });
});
