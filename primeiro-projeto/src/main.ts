import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //define q só sera enviado na requisição as propr. esperadas
    forbidNonWhitelisted: true, //se houver algo a mais na requisição tudo será barrado
    transform: true //faz a transformação do tipo de dado
  }))
  await app.listen(3000);
}
bootstrap();
