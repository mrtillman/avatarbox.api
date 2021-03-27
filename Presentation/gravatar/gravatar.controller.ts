import { Controller, Delete, Put, Get, Post, Req, Res } from '@nestjs/common';
import { GravatarClient } from 'avatarbox.sdk';
import { ImageProcessor } from '../../Common/image-processor';
import { ImageProcessorFactory } from '../../Common/image-processor-factory';
import { Request, Response } from 'express';
import { ValueRange } from '../../Common/value-range';
import { BaseController } from '../base.controller';

export const route = {
  root: 'gravatar',
  addresses: 'gravatar/addresses',
  exists: 'gravatar/exists',
  images: 'gravatar/images',
  test: 'gravatar/test',
};

@Controller('gravatar')
export class GravatarController extends BaseController {
  constructor(public imageProcessorFactory: ImageProcessorFactory) {
    super();
  }

  @Delete('/')
  removePrimaryImage(@Req() req: Request, @Res() res: Response) {
    const client = req.raw.gravatar as GravatarClient;
    let promise: Promise<any>;
    if (req.body && req.body.addresses && req.body.addresses.length) {
      promise = client.removeImage(...req.body.addresses);
    } else {
      promise = client.removeImage();
    }
    return promise
      .then((result) => res.send({ success: result.success }))
      .catch((err) => res.status(400).send(err.message));
  }

  @Put('/:imageName')
  setPrimaryImage(@Req() req: Request, @Res() res: Response) {
    const { imageName } = req.params;
    const client = req.raw.gravatar as GravatarClient;
    let promise: Promise<any>;
    if (req.body && req.body.addresses && req.body.addresses.length) {
      promise = client.useUserImage(imageName, ...req.body.addresses);
    } else {
      promise = client.useUserImage(imageName);
    }
    return promise
      .then((result) => res.send({ success: result.success }))
      .catch((err) => res.status(400).send(err.message));
  }

  @Get('/addresses')
  async addresses(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.addresses();
    return result.userAddresses;
  }

  @Post('/exists')
  async exists(@Req() req: Request, @Res() res: Response): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    let promise: Promise<any>;
    if (req.body && req.body.addresses && req.body.addresses.length) {
      promise = client.exists(...req.body.addresses);
    } else {
      promise = client.exists();
    }
    return promise
      .then((result) => res.send({ success: result.success }))
      .catch((err) => res.status(400).send(err.message));
  }

  @Get('/images')
  async getImages(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.userImages();
    return result.userImages;
  }

  @Post('/images')
  async postImages(@Req() req: Request, @Res() res: Response): Promise<any> {
    const factory = this.imageProcessorFactory;
    let processor: ImageProcessor;

    if (req.body && req.body.imageUrl) {
      processor = factory.createUrlProcessor(req.body.imageUrl);
    } else if (req.body && req.body.imageData) {
      processor = factory.createDataProcessor(req.body.imageData);
    } else if (req.raw.files) {
      const imageFilePath = await this.UploadFile(req.raw.files);
      processor = factory.createFileProcessor(imageFilePath);
    } else {
      return res.status(204).send();
    }

    const imageRating = new ValueRange(0, 3, req.body.imageRating);
    processor.imageRating = imageRating.value;
    processor.client = req.raw.gravatar as GravatarClient;

    return processor
      .process()
      .then((imageName) => res.send({ imageName }))
      .catch((err) => res.status(400).send(err.message));
  }

  @Delete('/images/:imageName')
  deleteImage(@Req() req: Request, @Res() res: Response) {
    const { imageName } = req.params;
    const client = req.raw.gravatar as GravatarClient;
    return client
      .deleteUserImage(imageName)
      .then((result) => res.send({ success: result.success }))
      .catch((err) => res.status(400).send(err.message));
  }

  @Delete('/images')
  async deleteImages(@Req() req: Request, @Res() res: Response) {
    const { imageNames } = req.body;
    if(imageNames && Array.isArray(imageNames)){
      const client = req.raw.gravatar as GravatarClient;
      return Promise.all(
        imageNames.map(imageName => client.deleteUserImage(imageName))
      ).then(() => res.send({ success: true }))
       .catch((err) => res.status(400).send(err.message));
    }
    return res.status(400).send({ message: "imageNames array not found in request body" });
  }

  @Get('/test')
  async test(@Req() req: Request): Promise<any> {
    const client = req.raw.gravatar as GravatarClient;
    const result = await client.test();
    return result.response;
  }
}
