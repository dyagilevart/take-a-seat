import { Injectable } from 'take-a-seat/node_modules/@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
