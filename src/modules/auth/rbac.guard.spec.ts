import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    rolesGuard = new RolesGuard(reflector);
  });

  it('should allow access if no roles are required', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(undefined); // No roles required

    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: () => ({
        getRequest: jest.fn().mockReturnValue({
          user: { id: '123', role: 'user' },
        }),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
      getHandler: jest.fn(),
    };

    const result = rolesGuard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(true); // Access allowed when no roles are required
  });

  it('should allow access if user role matches required roles', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['admin', 'user']); // Required roles

    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: () => ({
        getRequest: jest.fn().mockReturnValue({
          user: { id: '123', role: 'user' },
        }),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
      getHandler: jest.fn(),
    };

    const result = rolesGuard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(true); // Access allowed because role matches
  });

  it('should deny access if user role does not match required roles', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['admin']); // Required roles

    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: () => ({
        getRequest: jest.fn().mockReturnValue({
          user: { id: '123', role: 'user' },
        }),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
      getHandler: jest.fn(),
    };

    const result = rolesGuard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(false); // Access denied because role does not match
  });

  it('should deny access if user is not defined in the request', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(['admin']); // Required roles

    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: () => ({
        getRequest: jest.fn().mockReturnValue({}), // Empty request object (no user)
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
      getHandler: jest.fn(),
    };

    const result = rolesGuard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(false); // Access denied because user is undefined
  });

  it('should deny access if required roles are empty', () => {
    jest.spyOn(reflector, 'get').mockReturnValue([]); // Empty roles

    const mockExecutionContext: Partial<ExecutionContext> = {
      switchToHttp: () => ({
        getRequest: jest.fn().mockReturnValue({
          user: { id: '123', role: 'user' },
        }),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      }),
      getHandler: jest.fn(),
    };

    const result = rolesGuard.canActivate(mockExecutionContext as ExecutionContext);
    expect(result).toBe(false); // Access denied because roles are empty
  });
});
