import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { GravatarClient } from 'avatarbox.sdk';
import { Request, Response } from 'express';
import { ValueRange } from '../../Common/value-range';
import { BaseController } from '../base.controller';

export const route = {
  test: "gravatar/test",
  images: "gravatar/images",
  imageUrl: "gravatar/images/:imageUrl",
  exists: "gravatar/exists"
}

@Controller('gravatar')
export class GravatarController extends BaseController {
  constructor() {
    super();
  }

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
  async postImages(@Req() req: Request): Promise<any> {
    const imageRating = new ValueRange(0, 3, req.body.imageRating);
    const client = req.raw.gravatar as GravatarClient;
    const path = await this.uploadFile(req.raw.files);
    const result = await client.saveImage(path, imageRating.value);
    return {
      imageName: result.imageName,
    };
  }

  @Post('/images/:imageUrl')
  async postImageUrl(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { imageUrl } = req.params;
    const imageRating = new ValueRange(0, 3, req.body.imageRating);
    const client = req.raw.gravatar as GravatarClient;
    try {
      const result = await client.saveImageUrl(imageUrl,imageRating.value);  
      res.send({
        imageName: result.imageName
      });
    } catch (error) {
      const message = `Could not upload image from url: "${imageUrl}".`;
      res.status(400).send(message);
    }
  }

  @Get('/test')
  async test(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.test();
    return { response: result.response };
  }
}
