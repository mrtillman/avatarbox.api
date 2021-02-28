import { UnauthorizedErrorFilter } from './unauthorized-error.filter';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { MainModule } from './main.module';
const fileUpload = require('fastify-file-upload');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    MainModule,
    new FastifyAdapter(),
  );
  app.register(fileUpload, {
    limits: { fileSize: 1 * 1024 * 1024 },
    abortOnLimit: true,
    responseOnLimit:
      'The file is too large. Please select a file less than 1MB.',
    createParentPath: true,
  });
  app.useGlobalFilters(new UnauthorizedErrorFilter());
  app.enableCors();

  await app.listen(8081);
}
bootstrap();
