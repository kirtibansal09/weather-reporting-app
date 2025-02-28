import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming user info is stored in `req.user`

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Admins only.');
    }

    return true; // ✅ Allow access if the user is an admin
  }
}
