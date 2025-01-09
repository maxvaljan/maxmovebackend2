"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(createOrderDto) {
        const { customerId, pickupAddress, dropoffAddress, price, items, pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude } = createOrderDto;
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
    async getOrderById(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { customer: true, driver: true, payment: true },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
        }
        return order;
    }
    async updateOrderStatus(orderId, status) {
        const validStatuses = Object.values(client_1.OrderStatus);
        if (!validStatuses.includes(status)) {
            throw new common_1.BadRequestException(`Invalid status: ${status}`);
        }
        const order = await this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found.`);
        }
        return order;
    }
    async getAllOrders(status, page = 1, limit = 10) {
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
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
