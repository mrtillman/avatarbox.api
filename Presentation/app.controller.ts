import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AvbxGravatarClient } from 'avatarbox.sdk';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return this.appService.getRoot();
  }

  @Get('/hello')
  async getHello(@Req() req: Request): Promise<any[]> {
    const _req = (req as any);
    const user = _req.raw.user;
    const id = user.sub.split('|').pop();
    var client = new AvbxGravatarClient();
    var gravatar = await client.fetch(id);
    var result = await gravatar.userImages();
    return result.userImages;
    //return this.appService.getHello();
  }
}
