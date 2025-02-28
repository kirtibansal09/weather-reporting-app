import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Register User Model
  ], 
  controllers: [UserController],
  providers: [UsersService, JwtService],
  exports: [UsersService, MongooseModule, JwtService], // Make it available for other modules
})
export class UsersModule {}
