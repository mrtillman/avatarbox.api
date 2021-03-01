import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { GravatarClient } from 'avatarbox.sdk';
import { ImageProcessor } from 'Common/image-processor';
import { ImageProcessorFactory } from 'Common/image-processor-factory';
import { Request, Response } from 'express';
import { ValueRange } from '../../Common/value-range';
import { BaseController } from '../base.controller';

export const route = {
  test: 'gravatar/test',
  images: 'gravatar/images',
  imageUrl: 'gravatar/images/:imageUrl',
  exists: 'gravatar/exists',
};

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
  async postImages(@Req() req: Request, @Res() res: Response): Promise<any> {
    const factory = new ImageProcessorFactory();
    let processor: ImageProcessor;

    if (req.body && req.body.imageUrl) {
      processor = factory.createUrlProcessor(req.body.imageUrl);
    } else if (req.body && req.body.imageData) {
      processor = factory.createDataProcessor(req.body.imageData);
    } else if (req.raw.files) {
      const imageFilePath = await this.uploadFile(req.raw.files);
      processor = factory.createFileProcessor(imageFilePath);
    } else {
      return res.status(204).send();
    }

    const imageRating = new ValueRange(0, 3, req.body.imageRating);
    processor.imageRating = imageRating.value;
    processor.client = req.raw.gravatar as GravatarClient;

    processor
      .process()
      .then((imageName) => res.send({ imageName }))
      .catch((message) => res.status(400).send(message));
  }

  @Get('/test')
  async test(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.test();
    return { response: result.response };
  }
}
