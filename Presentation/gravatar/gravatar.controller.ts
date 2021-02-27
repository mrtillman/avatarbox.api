import { Controller, Get, Req } from '@nestjs/common';
import { GravatarClient } from 'avatarbox.sdk';
import { Request } from 'express';

@Controller('gravatar')
export class GravatarController {
  constructor() {}

  @Get('/images')
  async getImages(@Req() req: Request): Promise<any> {
    const gravatarClient = req.raw.gravatar as GravatarClient;
    const result = await gravatarClient.userImages();
    return result.userImages;
  }
}
