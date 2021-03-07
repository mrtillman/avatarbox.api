import { GravatarController } from './gravatar.controller';
import { Test } from '@nestjs/testing';
import { ImageProcessorFactory } from '../../Common/image-processor-factory';

describe('GravatarController', () => {
  let controller: GravatarController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [GravatarController],
      providers: [ImageProcessorFactory],
    }).compile();
    controller = moduleRef.get<GravatarController>(GravatarController);
  })

  describe('root', () => {
    it('should work', () => {
      expect(controller.addresses).toBeDefined();
    });
  });
});
