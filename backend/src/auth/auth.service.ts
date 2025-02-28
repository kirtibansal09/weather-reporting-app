import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserSchema } from '../user/user.schema';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly configService: ConfigService // ✅ Ensure this is injected
  ) {}

  

  async validateUser(token: string): Promise<User | null> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      if (!secret) throw new Error('JWT_SECRET is missing from config');

      const decoded = jwt.verify(token, secret) as { id: string; email: string; name: string; picture: string;  role?: string; };
      if (!decoded) throw new Error('Invalid token');

      const { id, email, name, picture } = decoded;

      let user = await this.userModel.findOne({ googleId: id });

      if (!user) {
        user = new this.userModel({ googleId: id, email, name, picture, role: 'user' });
        await user.save();
      }

      return user;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }

  async generateToken(user: User): Promise<string> {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) throw new Error('JWT_SECRET is missing from config');

    return jwt.sign(
      { 
        id: user.googleId, 
        email: user.email, 
        name: user.name, 
        picture: user.picture,
        role: user.role  // Include role in token
      }, 
      secret, 
      { expiresIn: '7d' }
    );
  }

}
