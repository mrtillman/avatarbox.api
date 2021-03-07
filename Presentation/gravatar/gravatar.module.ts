import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { GravatarController } from './gravatar.controller';
import { GravatarMiddleware } from './gravatar.middleware';
import { JwtMiddleware } from '../jwt.middleware';
import { route } from './gravatar.controller';
import { ImageProcessorFactory } from '../../Common/image-processor-factory';

@Module({
  imports: [],
  controllers: [GravatarController],
  providers: [ImageProcessorFactory],
})
export class GravatarModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const routes = [
      { path: route.addresses, method: RequestMethod.GET },
      { path: route.test, method: RequestMethod.GET },
      { path: route.exists, method: RequestMethod.POST },
      { path: route.images, method: RequestMethod.GET },
      { path: route.images, method: RequestMethod.POST },
      { path: `${route.root}/:imageName`, method: RequestMethod.PUT },
      { path: route.root, method: RequestMethod.DELETE },
      { path: `${route.images}/:imageName`, method: RequestMethod.DELETE },
    ];
    consumer
      .apply(JwtMiddleware)
      .forRoutes(...routes)
      .apply(GravatarMiddleware)
      .forRoutes(...routes);
  }
}
