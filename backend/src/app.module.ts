import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module'; // Ensure this is imported
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/weather-app'), // Your MongoDB URI
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    UsersModule,  // Import the UsersModule
    WeatherModule
  ],
})
export class AppModule {}
