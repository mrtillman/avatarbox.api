import { GravatarController } from './gravatar.controller';
import { Test } from '@nestjs/testing';
import { ImageProcessorFactory } from '../../Common/image-processor-factory';

const imageName = 'test-image';
const addresses = ['user1@example.com', 'user2@example.com'];
const mockGravatarClient = () => ({
  removeImage: jest.fn(),
  useUserImage: jest.fn(),
});
const mockRequest = (body = {}) => {
  return {
    raw: {
      gravatar: mockGravatarClient(),
    },
    body,
  } as any;
};
const mockResponse = () => {
  const send = jest.fn();
  return {
    status: jest.fn(() => ({ send })),
    send,
  } as any;
};

describe('GravatarController', () => {
  let controller: GravatarController;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GravatarController],
      providers: [ImageProcessorFactory],
    }).compile();
    controller = module.get<GravatarController>(GravatarController);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('removePrimaryImage', () => {
    it('should remove primary image', () => {
      const req = mockRequest();
      const { removeImage } = req.raw.gravatar;
      removeImage.mockReturnValue(
        new Promise((resolve) => resolve({ success: true })),
      );

      controller.removePrimaryImage(req, mockResponse());

      expect(removeImage.mock.calls[0]).toEqual([]);
    });
    it('should remove primary image for multiple email addresses', () => {
      const req = mockRequest({ addresses });
      const { removeImage } = req.raw.gravatar;
      removeImage.mockReturnValue(
        new Promise((resolve) => resolve({ success: true })),
      );

      controller.removePrimaryImage(req, mockResponse());

      expect(removeImage.mock.calls[0]).toEqual(req.body.addresses);
    });
    it('should send message on 400 error', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const message = 'this is a test';
      req.raw.gravatar.removeImage = () =>
        new Promise(() => {
          throw { message };
        });

      await controller.removePrimaryImage(req, res);

      expect(res.status.mock.calls[0][0]).toBe(400);
      expect(res.send.mock.calls[0][0]).toBe(message);
    });
  });

  describe('setPrimaryImage', () => {
    it('should set primary image', async () => {
      const req = mockRequest();
      req.params = { imageName };
      const { useUserImage } = req.raw.gravatar;
      useUserImage.mockReturnValue(
        new Promise((resolve) => resolve({ success: true })),
      );

      controller.setPrimaryImage(req, mockResponse());

      expect(useUserImage.mock.calls[0]).toEqual([req.params.imageName]);
    });
    it('should set primary image for multiple email addresses', () => {
      const req = mockRequest({ addresses });
      req.params = { imageName };
      const { useUserImage } = req.raw.gravatar;
      useUserImage.mockReturnValue(
        new Promise((resolve) => resolve({ success: true })),
      );

      controller.setPrimaryImage(req, mockResponse());

      expect(useUserImage.mock.calls[0]).toEqual([
        req.params.imageName,
        ...addresses,
      ]);
    });
    it('should send message on 400 error', async () => {
      const req = mockRequest();
      req.params = { imageName };
      const res = mockResponse();
      const message = 'this is a test';
      req.raw.gravatar.useUserImage = () =>
        new Promise(() => {
          throw { message };
        });

      await controller.setPrimaryImage(req, res);

      expect(res.status.mock.calls[0][0]).toBe(400);
      expect(res.send.mock.calls[0][0]).toBe(message);
    });
  });
});
