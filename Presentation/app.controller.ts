import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

import { writeFile } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return this.appService.getRoot();
  }

  @Get('/hello')
  getHello(@Req() req: Request): string {
    const _req = (req as any);
    const user = _req.raw.user;
    const id = user.sub.split('|').pop();
    console.log(id);
    return this.appService.getHello();
  }
}
