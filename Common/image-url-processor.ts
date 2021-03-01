import { GravatarClient, ImageRating } from "avatarbox.sdk";
import { ImageProcessor } from "./image-processor";

export class ImageUrlProcessor implements ImageProcessor {
  public imageUrl: string;
  public imageRating: ImageRating;
  public client: GravatarClient;
  
  constructor(imageUrl: string){
    this.imageUrl = imageUrl;
  }
  async process(): Promise<string>{
    try {
      const result = await this.client.saveImageUrl(this.imageUrl, this.imageRating);
      return result.imageName;
    } catch {
      throw `Could not upload image from url: "${this.imageUrl}".`;
    }
  }
}