import { Controller, Get, Req } from '@nestjs/common';
import { AvbxGravatarClient } from 'avatarbox.sdk';
import { Request } from 'express';

export const route = {
  collect: 'collect',
  dig: 'dig',
  peek: 'peek'
};

@Controller()
export class MainController {
  public client: AvbxGravatarClient;

  constructor() {
    this.client = new AvbxGravatarClient();
  }

  @Get('collect')
  async collect(@Req() req: Request): Promise<any> {
    return await this.client.collect();
  }

  @Get('dig')
  async dig(@Req() req: Request): Promise<any> {
    return await this.client.dig();
  }

  @Get('peek')
  async peek(@Req() req: Request): Promise<any> {
    return await this.client.peek();
  }

  @Get('/')
  getHome(@Req() req: Request): string {
    return 'let there be light';
  }
}
