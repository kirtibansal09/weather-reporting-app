

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // Fetch all users
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  // Enable user
  async enableUser(userId: string): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { isEnabled: true },
      { new: true }  // ✅ Ensures it returns the updated document
    ).exec();
  }

  // Disable user
  async disableUser(userId: string): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { isEnabled: false },
      { new: true }
    ).exec();
  }

  // Promote user to admin
  async makeAdmin(userId: string): Promise<User | null> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      { role: 'admin' },
      { new: true }
    ).exec();
  }
}
