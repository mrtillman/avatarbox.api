import { GravatarController } from './gravatar.controller';
import { Test } from '@nestjs/testing';
import { ImageProcessorFactory } from '../../Common/image-processor-factory';

const message = 'this is a test';
const imageName = 'test-image';
const addresses = ['user1@example.com', 'user2@example.com'];
const mockGravatarClient = () => ({
  removeImage: jest.fn(),
  deleteUserImage: jest.fn(),
  useUserImage: jest.fn(),
  addresses: jest.fn(),
  exists: jest.fn(),
  userImages: jest.fn(),
  test: jest.fn(),
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
  it('should get images', async () => {
    const userImages = ['image1', 'image2'];
    const req = mockRequest();
    const userImagesMethod = req.raw.gravatar.userImages as jest.Mock;
    userImagesMethod.mockReturnValue({ userImages });

    const result = await controller.getImages(req);

    expect(result).toEqual(userImages);
  });
  it('should support test method', async () => {
    const req = mockRequest();
    const response = 123;
    const test = req.raw.gravatar.test as jest.Mock;
    test.mockReturnValue({ response });

    const result = await controller.test(req);

    expect(result).toEqual(response);
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
      req.raw.gravatar.removeImage = () =>
        new Promise(() => {
          throw { message };
        });

      await controller.removePrimaryImage(req, res);

      expect(res.status.mock.calls[0][0]).toBe(400);
      expect(res.send.mock.calls[0][0]).toBe(message);
    });
    it('should get addresses', async () => {
      const req = mockRequest();
      const { gravatar } = req.raw;
      const addresses = gravatar.addresses as jest.Mock;
      addresses.mockReturnValue({ userAddresses: true });

      const result = await controller.addresses(req);

      expect(result).toBeDefined();
    });
  });
  describe('deleteImage', () => {
    it('should delete user image', () => {
      const req = mockRequest();
      req.params = { imageName };
      const { gravatar } = req.raw;
      const deleteUserImage = gravatar.deleteUserImage as jest.Mock;
      deleteUserImage.mockReturnValue(
        new Promise((resolve) => resolve({ success: true })),
      );

      controller.deleteImage(req, mockResponse());

      expect(deleteUserImage.mock.calls[0][0]).toBe(imageName);
    })
    it('should send message on 400 error', async () => {
      const req = mockRequest();
      req.params = { imageName };
      const res = mockResponse();
      req.raw.gravatar.deleteUserImage = null;
      req.raw.gravatar.deleteUserImage = () =>
        new Promise(() => {
          throw { message };
        });

      await controller.deleteImage(req, res);
      
      expect(res.status.mock.calls[0][0]).toBe(400);
      expect(res.send.mock.calls[0][0]).toBe(message);
    });
  })
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
      req.raw.gravatar.useUserImage = () =>
        new Promise(() => {
          throw { message };
        });

      await controller.setPrimaryImage(req, res);

      expect(res.status.mock.calls[0][0]).toBe(400);
      expect(res.send.mock.calls[0][0]).toBe(message);
    });
  });

  describe('exists', () => {
    it('should check if primary image exists', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const exists = req.raw.gravatar.exists as jest.Mock;
      const send = res.send as jest.Mock;
      exists.mockReturnValue(
        new Promise((resolve) => resolve({ success: true })),
      );

      await controller.exists(req, res);

      expect(send.mock.calls[0][0]).toEqual({ success: true });
    });
    it('should check if primary image exists for multiple email addresses', async () => {
      const req = mockRequest({ addresses });
      const res = mockResponse();
      const exists = req.raw.gravatar.exists as jest.Mock;
      exists.mockReturnValue(
        new Promise((resolve) => resolve({ success: true })),
      );

      await controller.exists(req, res);

      expect(exists.mock.calls[0]).toEqual(addresses);
    });
    it('should send message on 400 error', async () => {
      const req = mockRequest();
      const res = mockResponse();

      req.raw.gravatar.exists = () =>
        new Promise(() => {
          throw { message };
        });

      await controller.exists(req, res);

      expect(res.status.mock.calls[0][0]).toBe(400);
      expect(res.send.mock.calls[0][0]).toBe(message);
    });
  });
});
