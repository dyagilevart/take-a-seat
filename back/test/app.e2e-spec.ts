import { Test, TestingModule } from 'take-a-seat/node_modules/@nestjs/testing';
import { INestApplication } from 'take-a-seat/node_modules/@nestjs/common';
import * as request from 'take-a-seat/node_modules/@types/supertest';
import { AppModule } from '../take-a-seat/src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
