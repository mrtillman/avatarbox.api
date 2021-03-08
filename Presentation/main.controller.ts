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
  constructor(private _client: AvbxGravatarClient) {}

  @Post('on')
  async on(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    return await this._client.on(client.email);
  }

  @Post('off')
  async off(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    return await this._client.off(client.email);
  }

  @Get('collect')
  async collect(): Promise<any> {
    return (await this._client.collect()) || [];
  }

  @Get('dig')
  async dig(): Promise<any> {
    return (await this._client.dig()) || [];
  }

  @Get('peek')
  async peek(): Promise<any> {
    return (await this._client.peek()) || [];
  }

  @Get('/')
  getHome(): string {
    return 'let there be light';
  }
}
