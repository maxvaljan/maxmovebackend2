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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma.service");
let BookingService = class BookingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    // Create a new booking
    async createBooking(data) {
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
    async getBookingsByUser(userId) {
        return await this.prisma.order.findMany({
            where: { customer_id: userId },
            include: {
                deliveries: true,
                payment: true,
            },
        });
    }
    // Update booking status
    async updateBookingStatus(orderId, statusUpdate) {
        const { status } = statusUpdate;
        return await this.prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
