import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // 🔍 Log Headers for Debugging
    console.log('Request Headers:', request.headers);

    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('❌ No Authorization header found');
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error('❌ Token extraction failed');
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      if (!secret) {
        console.error('❌ Missing JWT_SECRET in environment');
        throw new UnauthorizedException('JWT configuration error');
      }

      console.log('🔑 Using JWT_SECRET:', secret);

      const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
      console.log('✅ Decoded JWT:', decoded);

      if (!decoded || typeof decoded !== 'object' || !decoded.id) {
        console.error('❌ Invalid JWT payload:', decoded);
        throw new UnauthorizedException('Invalid token payload');
      }

      request.user = decoded;
      return true;

    } catch (error) {
      console.error('❌ JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
