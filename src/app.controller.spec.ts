import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ExampleAvailableProducts from './sample';

describe('AppController', () => {
  let app: TestingModule;
  let dateSpy;

  beforeAll(async () => {
    dateSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => Date.parse('2021-11-06'));

    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getAvailableProducts', () => {
    it('should return "2 streams"', () => {
      const appController = app.get<AppController>(AppController);
      const response = appController.getAvailableProducts('1111');
      expect(response.length).toBe(2);
      expect(response).toStrictEqual(ExampleAvailableProducts);
    });
  });

  afterAll(async () => {
    await app.close();
    dateSpy.mockRestore();
  });
});
