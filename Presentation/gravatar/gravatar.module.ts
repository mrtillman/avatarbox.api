import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { GravatarController } from './gravatar.controller';
import { GravatarMiddleware } from './gravatar.middleware';
import { JwtMiddleware } from '../jwt.middleware';
import { route } from './gravatar.controller';

@Module({
  imports: [],
  controllers: [GravatarController],
  providers: [],
})
export class GravatarModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes(route.exists, route.images, route.imageUrl, route.test)
      .apply(GravatarMiddleware)
      .forRoutes(
        { path: route.exists, method: RequestMethod.GET },
        { path: route.images, method: RequestMethod.GET },
        { path: route.images, method: RequestMethod.POST },
        { path: route.imageUrl, method: RequestMethod.POST },
        { path: route.test, method: RequestMethod.GET },
      );
  }
}
