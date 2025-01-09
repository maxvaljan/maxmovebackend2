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
exports.DeliveryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let DeliveryService = class DeliveryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    // Assign a delivery to an agent
    async assignDelivery(orderId, deliveryAgent) {
        const delivery = await this.prisma.delivery.create({
            data: {
                orderId,
                deliveryAgent,
                status: 'Out for Delivery', // Initial status
            },
        });
        return delivery;
    }
    // Update the delivery status
    async updateDeliveryStatus(deliveryId, status) {
        const updatedDelivery = await this.prisma.delivery.update({
            where: { id: deliveryId },
            data: { status },
        });
        return updatedDelivery;
    }
    // Get a delivery's status by orderId
    async getDeliveryStatus(orderId) {
        return this.prisma.delivery.findUnique({
            where: { orderId },
        });
    }
    // Find delivery by its unique `id`
    async trackDelivery(deliveryId) {
        return this.prisma.delivery.findUnique({
            where: { id: deliveryId }, // Use `id` instead of `orderId`
        });
    }
};
exports.DeliveryService = DeliveryService;
exports.DeliveryService = DeliveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DeliveryService);
