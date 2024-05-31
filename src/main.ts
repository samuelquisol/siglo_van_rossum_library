import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.setGlobalPrefix('api/v1');

  // Set up global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Siglo Van Rossum Library API')
    .setDescription('API for managing the catalog of books, authors, and sales')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'api/swagger';

  SwaggerModule.setup(swaggerPath, app, document);
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/v1`);
  console.log(`Swagger on: http://localhost:${port}/${swaggerPath}`);
}

bootstrap();
