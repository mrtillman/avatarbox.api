import { UnauthorizedErrorFilter } from './unauthorized-error.filter';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { GravatarModule } from './gravatar/gravatar.module';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new UnauthorizedErrorFilter());
  app.enableCors();

  await app.listen(8081);
}
bootstrap();
