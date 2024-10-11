import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { EnvironmentEnum } from '@common/enums/environment.enum';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from '@common/filters/exception.filter';
import { LoggerMiddleware } from '@common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: false,
  })

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: '/health', method: RequestMethod.GET },
      { path: '/health/readiness', method: RequestMethod.GET },
      { path: '/health/liveness', method: RequestMethod.GET },
    ],
  })

  app.enableVersioning({
    type: VersioningType.URI,
  })

  app.use(new LoggerMiddleware().use)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  )
  app.useGlobalFilters(new AllExceptionsFilter());

  const configService = app.get(ConfigService)
  const envCfg = configService.get<string>('NODE_ENV')
  const portCfg = configService.get<number>('NODE_DOCKER_PORT')

  if ([String(EnvironmentEnum.DEV), String(EnvironmentEnum.HML)].includes(envCfg)) {
    const config = new DocumentBuilder()
      .setTitle('Teste - API SERASA')
      .setDescription('Testando conhecimentos...')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)
  }

  await app.listen(portCfg);
}
bootstrap();
