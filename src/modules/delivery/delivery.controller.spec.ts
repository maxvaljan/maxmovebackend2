import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';

describe('DeliveryController', () => {
  let deliveryController: DeliveryController;
  let deliveryService: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        {
          provide: DeliveryService,
          useValue: {
            assignDelivery: jest.fn(),
            updateDeliveryStatus: jest.fn(),
            getDeliveryStatus: jest.fn(),
            trackDelivery: jest.fn(),
          },
        },
      ],
    }).compile();

    deliveryController = module.get<DeliveryController>(DeliveryController);
    deliveryService = module.get<DeliveryService>(DeliveryService);
  });

  it('should be defined', () => {
    expect(deliveryController).toBeDefined();
  });

  describe('assignDelivery', () => {
    it('should call assignDelivery in the service with the correct parameters', async () => {
      const mockResult = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Out for Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(deliveryService, 'assignDelivery')
        .mockResolvedValue(mockResult);

      const result = await deliveryController.assignDelivery('order123', 'agent123');

      expect(result).toEqual(mockResult);
      expect(deliveryService.assignDelivery).toHaveBeenCalledWith(
        'order123',
        'agent123',
      );
    });
  });

  describe('updateStatus', () => {
    it('should call updateDeliveryStatus in the service with the correct parameters', async () => {
      const mockResult = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Delivered',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(deliveryService, 'updateDeliveryStatus')
        .mockResolvedValue(mockResult);

      const result = await deliveryController.updateStatus(
        'delivery123',
        'Delivered',
      );

      expect(result).toEqual(mockResult);
      expect(deliveryService.updateDeliveryStatus).toHaveBeenCalledWith(
        'delivery123',
        'Delivered',
      );
    });
  });

  describe('getStatus', () => {
    it('should call getDeliveryStatus in the service with the correct parameters', async () => {
      const mockResult = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Out for Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(deliveryService, 'getDeliveryStatus')
        .mockResolvedValue(mockResult);

      const result = await deliveryController.getStatus('order123');

      expect(result).toEqual(mockResult);
      expect(deliveryService.getDeliveryStatus).toHaveBeenCalledWith(
        'order123',
      );
    });

    it('should return null if no delivery status is found', async () => {
      jest.spyOn(deliveryService, 'getDeliveryStatus').mockResolvedValue(null);

      const result = await deliveryController.getStatus('order123');

      expect(result).toBeNull();
      expect(deliveryService.getDeliveryStatus).toHaveBeenCalledWith(
        'order123',
      );
    });
  });

  describe('trackDelivery', () => {
    it('should call trackDelivery in the service with the correct parameters', async () => {
      const mockResult = {
        id: 'delivery123',
        orderId: 'order123',
        deliveryAgent: 'agent123',
        status: 'Out for Delivery',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest
        .spyOn(deliveryService, 'trackDelivery')
        .mockResolvedValue(mockResult);

      const result = await deliveryController.trackDelivery('delivery123');

      expect(result).toEqual(mockResult);
      expect(deliveryService.trackDelivery).toHaveBeenCalledWith(
        'delivery123',
      );
    });

    it('should return null if no delivery is found', async () => {
      jest.spyOn(deliveryService, 'trackDelivery').mockResolvedValue(null);

      const result = await deliveryController.trackDelivery('delivery123');

      expect(result).toBeNull();
      expect(deliveryService.trackDelivery).toHaveBeenCalledWith(
        'delivery123',
      );
    });
  });
});
