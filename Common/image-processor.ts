import { GravatarClient, ImageRating } from "avatarbox.sdk";

export interface ImageProcessor {
  imageRating: ImageRating;
  client: GravatarClient;
  process(): Promise<string>;
}