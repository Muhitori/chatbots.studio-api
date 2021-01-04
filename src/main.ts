import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TeachersService } from './teachers/teachers.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const service = app.get(TeachersService);

  await app.listen(process.env.PORT || 3000);
  console.log(await service.getTargetMathTeachers());
}
bootstrap();
