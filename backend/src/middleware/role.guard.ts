import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { User } from 'src/user/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string>('role', context.getHandler());
    if (!requiredRole) return true; 
  
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
  
    console.log('Request User:', user); // Debugging
    
    if (!user) {
      console.error(' No user found in request. Make sure JwtAuthGuard is applied.');
      return false;
    }
  
    if (!user.role) {
      console.error(' User object found, but role is missing:', user);
      return false;
    }
  
    console.log(`Checking role: User=${user.role}, Required=${requiredRole}`);
    return user.role === requiredRole;
  }
  
  
}
