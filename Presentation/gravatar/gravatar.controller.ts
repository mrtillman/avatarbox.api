import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { GravatarClient, ImageRating } from 'avatarbox.sdk';
import { Request, Response } from 'express';
import { v4 as guid } from 'uuid';
import { ValueRange } from '../../Common/value-range';

export const route = {
  test: "gravatar/test",
  images: "gravatar/images",
  exists: "gravatar/exists"
}

@Controller('gravatar')
export class GravatarController {
  constructor() {}

  @Get('/exists')
  async exists(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.exists();
    return { success: result.success };
  }

  @Get('/images')
  async getImages(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.userImages();
    return result.userImages;
  }

  @Post('/images')
  async postImages(@Req() req: Request, @Res() res: Response): Promise<any> {
    const imageRating = new ValueRange(0, 3, req.body.imageRating);
    const client = req.raw.gravatar as GravatarClient;
    for(const key in req.raw.files){
      const file = req.raw.files[key];
      const fileName = guid();
      const ext = file.mimetype.substring(file.mimetype.indexOf('/') + 1);
      const path = `./uploads/${fileName}.${ext}`;
      file.mv(path, () => {
        client.saveImage(path, imageRating.value);
        res.send();
      });
      break;
    }
  }

  @Get('/test')
  async test(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.test();
    return { response: result.response };
  }
}
