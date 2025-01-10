import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { BookingService } from './bookings.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  createBooking(@Body() bookingData: any) {
    return this.bookingService.createBooking(bookingData);
  }

  @Get(':userId')
  getUserBookings(@Param('userId') userId: string) {
    return this.bookingService.getBookingsByUser(userId);
  }

  @Patch(':id')
  updateBookingStatus(@Param('id') id: string, @Body() statusUpdate: any) {
    return this.bookingService.updateBookingStatus(id, statusUpdate);
  }
}
