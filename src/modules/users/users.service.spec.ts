import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../common/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserType } from '@prisma/client'; // Ensure this is imported at the top

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  // Set up the test module
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        password: 'hashedpassword',
        user_type: UserType.customer, // Correct enum value
        role: 'User',
        profile_picture: null, // Ensure this is included
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.findByEmail('john@example.com');
      expect(result).toEqual(user);
    });

    it('should return null if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@example.com');
      expect(result).toBeNull();
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123456789',
        password: 'hashedpassword',
        user_type: UserType.driver, // Correct enum value
        role: 'User',
        profile_picture: null, // Ensure this is included
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

      const result = await service.getUserById('1');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(service.getUserById('nonexistent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should successfully create a new user', async () => {
      const newUser = {
        email: 'john@example.com',
        password: 'hashedpassword',
        role: 'User',
        name: 'John Doe',
        phone: '123456789',
        user_type: UserType.driver, // Correct enum value
      };

      const createdUser = {
        id: '1',
        ...newUser,
        profile_picture: null, // Ensure this is included
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);

      const result = await service.createUser(
        newUser.email,
        newUser.password,
        newUser.role,
        newUser.name,
        newUser.phone,
        newUser.user_type, // Correct field name
      );

      expect(result).toEqual(createdUser);
    });

    it('should throw BadRequestException if user type is invalid', async () => {
      const newUser = {
        email: 'john@example.com',
        password: 'hashedpassword',
        role: 'User',
        name: 'John Doe',
        phone: '123456789',
        user_type: 'InvalidType', // Invalid user type
      };

      await expect(
        service.createUser(
          newUser.email,
          newUser.password,
          newUser.role,
          newUser.name,
          newUser.phone,
          newUser.user_type,
        ),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
