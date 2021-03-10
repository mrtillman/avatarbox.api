import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { MainController } from './main.controller';
import { GravatarModule } from './gravatar/gravatar.module';
import { GravatarMiddleware } from './gravatar/gravatar.middleware';
import { JwtMiddleware } from './jwt.middleware';
import { route } from './main.controller';
import { AvbxGravatarClient } from 'avatarbox.sdk';

@Module({
  imports: [GravatarModule],
  controllers: [MainController],
  providers: [AvbxGravatarClient],
})
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const routes = [
      { path: route.collect, method: RequestMethod.GET },
      { path: route.dig, method: RequestMethod.GET },
      { path: route.peek, method: RequestMethod.GET },
      { path: route.isactive, method: RequestMethod.GET },
      { path: route.on, method: RequestMethod.POST },
      { path: route.off, method: RequestMethod.POST },
    ];
    consumer
      .apply(JwtMiddleware)
      .forRoutes(...routes)
      .apply(GravatarMiddleware)
      .forRoutes(
        route.on, 
        route.off,
        route.isactive
      );
  }
}
