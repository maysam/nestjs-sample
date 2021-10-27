import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { AvailableProduct } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('available-products/:postalCode')
  getAvailableProducts(
    @Param('postalCode') postalCode: string,
  ): AvailableProduct[] {
    return this.appService.getAvailableProducts(postalCode);
  }
}
