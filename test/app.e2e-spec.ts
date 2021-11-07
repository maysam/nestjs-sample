import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import ExampleAvailableProducts from '../src/sample';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dateSpy;

  beforeAll(async () => {
    dateSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => Date.parse('2021-11-06'));
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/available-products/:postalCode (GET)', () => {
    return request(app.getHttpServer())
      .get('/available-products/1111')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toStrictEqual(ExampleAvailableProducts);
      });
  });

  afterAll(async () => {
    await app.close();
    dateSpy.mockRestore();
  });
});
