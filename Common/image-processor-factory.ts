import { Injectable } from '@nestjs/common';
import { ImageDataProcessor } from './image-data-processor';
import { ImageFileProcessor } from './image-file-processor';
import { ImageProcessor } from './image-processor';
import { ImageUrlProcessor } from './image-url-processor';

@Injectable()
export class ImageProcessorFactory {
  public createDataProcessor(imageData: string): ImageProcessor {
    return new ImageDataProcessor(imageData);
  }
  public createFileProcessor(imageFilePath: string): ImageProcessor {
    return new ImageFileProcessor(imageFilePath);
  }
  public createUrlProcessor(imageUrl: string): ImageProcessor {
    return new ImageUrlProcessor(imageUrl);
  }
}
