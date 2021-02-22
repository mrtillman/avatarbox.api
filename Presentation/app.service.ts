import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return 'let there be light';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
