import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AvailableProductDto } from './app.entity';
import { AvailableProduct } from './interfaces';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('available-products/:postalCode')
  @ApiOkResponse({ status: 200, isArray: true, type: AvailableProductDto })
  getAvailableProducts(
    @Param('postalCode') postalCode: string,
  ): AvailableProduct[] {
    return this.appService.getAvailableProducts(postalCode);
  }
}
