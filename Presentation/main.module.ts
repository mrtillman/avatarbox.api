import { MiddlewareConsumer } from '@nestjs/common';
import { Module, NestModule } from '@nestjs/common';
import { MainController } from './main.controller';
import { GravatarModule } from './gravatar/gravatar.module';

@Module({
  imports: [GravatarModule],
  controllers: [MainController],
  providers: [],
})
export class MainModule {}
