import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TeachersModule],
})
export class AppModule {}
