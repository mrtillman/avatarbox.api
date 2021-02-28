import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { GravatarController } from './gravatar.controller';
import { GravatarMiddleware } from './gravatar.middleware';
import { JwtMiddleware } from '../jwt.middleware';

@Module({
  imports: [],
  controllers: [GravatarController],
  providers: [],
})
export class GravatarModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const imagesRoute = "gravatar/images";
    consumer
      .apply(JwtMiddleware).forRoutes(imagesRoute)
      .apply(GravatarMiddleware).forRoutes(
        { path: imagesRoute, method: RequestMethod.GET },
        { path: imagesRoute, method: RequestMethod.POST }
      );
  }
}
