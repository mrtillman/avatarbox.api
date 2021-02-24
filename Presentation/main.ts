import { UnauthorizedErrorFilter } from './unauthorized-error.filter';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalFilters(new UnauthorizedErrorFilter());
  app.enableCors();

  await app.listen(8081);
}
bootstrap();
