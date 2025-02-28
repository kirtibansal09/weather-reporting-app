import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @UseGuards(JwtAuthGuard)  // ✅ Protect API with authentication
  async getWeather(@Query('city') city: string, @Query('country') country: string) {
    return this.weatherService.getWeather(city, country);
  }

  @Get('aqi')
  @UseGuards(JwtAuthGuard)
  async getAQI(@Query('city') city: string, @Query('state') state: string, @Query('country') country: string) {
    return this.weatherService.getAQI(city, state, country);
  }
}
