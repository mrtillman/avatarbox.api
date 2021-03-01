import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { MainController } from './main.controller';
import { GravatarModule } from './gravatar/gravatar.module';
import { JwtMiddleware } from './jwt.middleware';
import { route } from './main.controller';

@Module({
  imports: [GravatarModule],
  controllers: [MainController],
  providers: [],
})
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const routes = [
      { path: route.collect, method: RequestMethod.GET },
      { path: route.dig, method: RequestMethod.GET },
      { path: route.peek, method: RequestMethod.GET },
    ];
    consumer
      .apply(JwtMiddleware)
      .forRoutes(...routes)
  }
}
