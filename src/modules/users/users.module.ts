import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../common/prisma.service'; 
import { BookingModule } from '../bookings/bookings.module';

@Module({
  imports: [BookingModule], // Import PrismaModule for database access
  controllers: [UsersController],
  providers: [UsersService,PrismaService],
  exports: [UsersService], // Export UsersService so it can be used in other modules
})
export class UsersModule {}
