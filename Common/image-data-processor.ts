import { GravatarClient, ImageRating } from "avatarbox.sdk";
import { ImageProcessor } from "./image-processor";

export class ImageDataProcessor implements ImageProcessor {
  public imageData: string;
  public imageRating: ImageRating;
  public client: GravatarClient;
  
  constructor(imageData: string){
    this.imageData = imageData;
  }
  async process(): Promise<string>{
    try {
      const result = await this.client.saveEncodedImage(this.imageData, this.imageRating);
      return result.imageName;
    } catch {
      throw "Could not upload image data.";
    }
  }
}