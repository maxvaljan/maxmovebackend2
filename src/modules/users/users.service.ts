import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    return this.prisma.user.findMany(); // Example Prisma query
  }
  
  async createUser(
    email: string,
    password: string,
    role: string | null,
    name: string,
    phone: string,
    userType: string,
  ) {
    if (!Object.values(UserType).includes(userType as UserType)) {
      throw new BadRequestException(`Invalid user type: ${userType}`);
    }
  
    return this.prisma.user.create({
      data: {
        email,
        password,
        role,
        name,
        phone,
        user_type: userType as UserType, // Cast to enum
      },
    });
  }
  

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  
  async getUserById(userId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  
    return user; // The user is guaranteed to be non-null here.
  }
  
  async findById(id: string): Promise<User | null> {  // Allowing null return type
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  

  async updateUserRole(id: string, role: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}
