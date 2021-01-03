import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TeachersService } from './teachers/teachers.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get(TeachersService);

  console.log(await service.getAll());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
