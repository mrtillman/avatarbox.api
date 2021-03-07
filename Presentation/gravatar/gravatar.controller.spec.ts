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

  describe('removePrimaryImage', () => {
    it('should work', async () => {
      const removeImage = jest.fn();
      
      removeImage.mockReturnValue(new Promise(resolve => resolve({ success: true })));

      const req = {
        raw: {
          gravatar: {
            removeImage
          }
        }
      } as any;
      
      const res = { send: jest.fn() } as any;
      
      await controller.removePrimaryImage(req, res);

      expect(removeImage.mock.calls[0]).toEqual([]);
    });
  });
});
