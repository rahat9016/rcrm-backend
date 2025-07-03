import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipes/validation-exception.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: '1',
    })
    .setGlobalPrefix('api');
  app.useGlobalPipes(new CustomValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Restaurant POS API')
    .setDescription(
      'A scalable and modular Restaurant Point of Sale (POS) backend system built with NestJS. It manages users, orders, real-time kitchen updates, payments, inventory, and reporting functionalities — all secured with role-based access control.',
    )
    .setVersion('1.0')
    .addTag('RCRM')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
