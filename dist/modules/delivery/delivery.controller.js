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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const delivery_service_1 = require("./delivery.service");
let DeliveryController = class DeliveryController {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
    }
    // Assign delivery to an agent
    async assignDelivery(orderId, deliveryAgent) {
        return this.deliveryService.assignDelivery(orderId, deliveryAgent);
    }
    // Update the status of a delivery
    async updateStatus(deliveryId, status) {
        return this.deliveryService.updateDeliveryStatus(deliveryId, status);
    }
    // Get the delivery status for a specific order
    async getStatus(orderId) {
        return this.deliveryService.getDeliveryStatus(orderId);
    }
    // Track a specific delivery by ID
    async trackDelivery(deliveryId) {
        return this.deliveryService.trackDelivery(deliveryId);
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Post)('assign/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)('deliveryAgent')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "assignDelivery", null);
__decorate([
    (0, common_1.Patch)('update-status/:deliveryId'),
    __param(0, (0, common_1.Param)('deliveryId')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('status/:orderId'),
    __param(0, (0, common_1.Param)('orderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('track/:deliveryId'),
    __param(0, (0, common_1.Param)('deliveryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "trackDelivery", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, common_1.Controller)('deliveries'),
    __metadata("design:paramtypes", [delivery_service_1.DeliveryService])
], DeliveryController);
