import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue({
              id: '123',
              email: 'test@example.com',
              password: await bcrypt.hash('password', 10),
              role: 'user',
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn((payload) => `signed-token:${JSON.stringify(payload)}`),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should validate user credentials', async () => {
    const email = 'test@example.com';
    const password = 'password';

    const user = await authService.validateUser(email, password);

    expect(usersService.findByEmail).toHaveBeenCalledWith(email);
    expect(user).toMatchObject({
      id: '123',
      email: 'test@example.com',
      role: 'user',
    });
  });

  it('should return null for invalid credentials', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

    const user = await authService.validateUser('wrong@example.com', 'wrongpassword');

    expect(usersService.findByEmail).toHaveBeenCalledWith('wrong@example.com');
    expect(user).toBeNull();
  });

  it('should generate a JWT token on login', async () => {
    const user = {
      id: '123',
      email: 'test@example.com',
      role: 'user',
    };

    const result = await authService.login(user);

    expect(jwtService.sign).toHaveBeenCalledWith({
      username: user.email,
      sub: user.id,
      role: user.role,
    });
    expect(result).toEqual({
      access_token: expect.stringContaining('signed-token'),
    });
  });
});
