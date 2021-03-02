import { Controller, Get, Post, Req } from '@nestjs/common';
import { AvbxGravatarClient, GravatarClient } from 'avatarbox.sdk';
import { Request } from 'express';

export const route = {
  collect: 'collect',
  dig: 'dig',
  on: 'on',
  off: 'off',
  peek: 'peek',
};

@Controller()
export class MainController {
  public client: AvbxGravatarClient;

  constructor() {
    this.client = new AvbxGravatarClient();
  }
  
  @Post('on')
  async on(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    return await this.client.on(client.email);
  }

  @Post('off')
  async off(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    return await this.client.off(client.email);
  }

  @Get('collect')
  async collect(): Promise<any> {
    return await this.client.collect() || [];
  }

  @Get('dig')
  async dig(@Req() req: Request): Promise<any> {
    return await this.client.dig() || [];
  }

  @Get('peek')
  async peek(@Req() req: Request): Promise<any> {
    return await this.client.peek() || [];
  }

  @Get('/')
  getHome(@Req() req: Request): string {
    return 'let there be light';
  }
}
