import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../database/prisma.module'; // Assuming you use Prisma for database interactions

@Module({
  imports: [PrismaModule], // Import PrismaModule for database access
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Export UsersService so it can be used in other modules
})
export class UsersModule {}
