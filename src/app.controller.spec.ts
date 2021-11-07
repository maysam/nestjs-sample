import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ExampleAvailableProducts from './data/sample_output';

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
    it('should return 2 streams for postalCode 1111AB', () => {
      const appController = app.get<AppController>(AppController);
      const response = appController.getAvailableProducts('1111AB');
      expect(response).toHaveLength(2);
      expect(response).toStrictEqual(ExampleAvailableProducts);
    });

    it('should return no streams for 2000', () => {
      const appController = app.get<AppController>(AppController);
      const response = appController.getAvailableProducts('2000');
      expect(response).toHaveLength(0);
      expect(response).toMatchObject({});
    });
  });

  afterAll(async () => {
    await app.close();
    dateSpy.mockRestore();
  });
});
