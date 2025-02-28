import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly iqAirUrl = 'http://api.airvisual.com/v2/city';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {}

  async getWeather(city: string, country: string): Promise<any> {
    try {
      const apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
      const url = `${this.openWeatherUrl}?q=${city},${country}&appid=${apiKey}&units=metric`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching weather:', error.message);
      throw new Error('Failed to fetch weather data');
    }
  }

  async getAQI(city: string, state: string, country: string): Promise<any> {
    try {
      const apiKey = this.configService.get<string>('IQAIR_API_KEY');
      const url = `${this.iqAirUrl}?city=${city}&state=${state}&country=${country}&key=${apiKey}`;

      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      console.error('Error fetching AQI:', error.message);
      throw new Error('Failed to fetch AQI data');
    }
  }
}
