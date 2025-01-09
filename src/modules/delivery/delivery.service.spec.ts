import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { PrismaService } from '../../common/prisma.service';
import { Delivery } from '@prisma/client';

describe('DeliveryService', () => {
  let deliveryService: DeliveryService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryService,
        {
          provide: PrismaService,
          useValue: {
            delivery: {
              create: jest.fn(),
              update: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    deliveryService = module.get<DeliveryService>(DeliveryService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(deliveryService).toBeDefined();
  });

  describe('assignDelivery', () => {
    it('should assign a delivery to an agent', async () => {
      const mockDelivery: Delivery = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Out for Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.delivery, 'create').mockResolvedValue(mockDelivery);

      const result = await deliveryService.assignDelivery(
        'order123',
        'agent123',
      );

      expect(result).toEqual(mockDelivery);
      expect(prismaService.delivery.create).toHaveBeenCalledWith({
        data: {
          orderId: 'order123',
          deliveryAgent: 'agent123',
          status: 'Out for Delivery',
        },
      });
    });
  });

  describe('updateDeliveryStatus', () => {
    it('should update the delivery status', async () => {
      const mockUpdatedDelivery: Delivery = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Delivered',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.delivery, 'update').mockResolvedValue(mockUpdatedDelivery);

      const result = await deliveryService.updateDeliveryStatus(
        'delivery123',
        'Delivered',
      );

      expect(result).toEqual(mockUpdatedDelivery);
      expect(prismaService.delivery.update).toHaveBeenCalledWith({
        where: { id: 'delivery123' },
        data: { status: 'Delivered' },
      });
    });
  });

  describe('getDeliveryStatus', () => {
    it('should return the delivery status by orderId', async () => {
      const mockDelivery: Delivery = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Out for Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.delivery, 'findUnique').mockResolvedValue(mockDelivery);

      const result = await deliveryService.getDeliveryStatus('order123');

      expect(result).toEqual(mockDelivery);
      expect(prismaService.delivery.findUnique).toHaveBeenCalledWith({
        where: { orderId: 'order123' },
      });
    });

    it('should return null if delivery is not found', async () => {
      jest.spyOn(prismaService.delivery, 'findUnique').mockResolvedValue(null);

      const result = await deliveryService.getDeliveryStatus('order123');

      expect(result).toBeNull();
      expect(prismaService.delivery.findUnique).toHaveBeenCalledWith({
        where: { orderId: 'order123' },
      });
    });
  });

  describe('trackDelivery', () => {
    it('should return the delivery details by deliveryId', async () => {
      const mockDelivery: Delivery = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Out for Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(prismaService.delivery, 'findUnique').mockResolvedValue(mockDelivery);

      const result = await deliveryService.trackDelivery('delivery123');

      expect(result).toEqual(mockDelivery);
      expect(prismaService.delivery.findUnique).toHaveBeenCalledWith({
        where: { id: 'delivery123' },
      });
    });

    it('should return null if delivery is not found', async () => {
      jest.spyOn(prismaService.delivery, 'findUnique').mockResolvedValue(null);

      const result = await deliveryService.trackDelivery('delivery123');

      expect(result).toBeNull();
      expect(prismaService.delivery.findUnique).toHaveBeenCalledWith({
        where: { id: 'delivery123' },
      });
    });
  });
});
