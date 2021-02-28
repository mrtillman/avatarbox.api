import { Test, TestingModule } from '@nestjs/testing';
import { GravatarController } from './gravatar.controller';

describe('GravatarController', () => {
  let gravatarController: GravatarController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GravatarController],
      providers: [],
    }).compile();
    gravatarController = app.get<GravatarController>(GravatarController);
  });

  describe('root', () => {
    it('should work', () => {
      expect(true).toBe(true);
    });
  });
});
