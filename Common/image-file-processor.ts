import { GravatarClient, ImageRating } from 'avatarbox.sdk';
import { ImageProcessor } from './image-processor';

export class ImageFileProcessor implements ImageProcessor {
  public imageFilePath: string;
  public imageRating: ImageRating;
  public client: GravatarClient;

  constructor(imageFilePath: string) {
    this.imageFilePath = imageFilePath;
  }
  async process(): Promise<string> {
    const result = await this.client.saveImage(
      this.imageFilePath,
      this.imageRating,
    );
    return result.imageName;
  }
}
