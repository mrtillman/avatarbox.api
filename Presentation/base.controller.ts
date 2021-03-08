import { Controller } from '@nestjs/common';
import { v4 as guid } from 'uuid';

@Controller()
export class BaseController {
  constructor() {}

  async uploadFile(files: any): Promise<string> {
    return new Promise((resolve) => {
      for (const key in files) {
        const file = files[key];
        const fileName = guid();
        const ext = file.mimetype.substring(file.mimetype.indexOf('/') + 1);
        const path = `./uploads/${fileName}.${ext}`;
        file.mv(path, () => {
          resolve(path);
        });
        break;
      }
    });
  }
}
