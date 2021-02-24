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
    const context = (req as any).context;
    const text = Buffer.from(JSON.stringify(context));
    writeFile('./requestContext.txt', text.toString(), (err)=>{
      if(err) console.log(err);
    });
    return this.appService.getHello();
  }
}
