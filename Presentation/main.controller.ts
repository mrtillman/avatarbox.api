import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller()
export class MainController {
  constructor() {}

  @Get('/')
  getHome(@Req() req: Request): string {
    return 'let there be light';
  }
}
