import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherDto } from '../interfaces/teacher.dto';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) {}

  async getAll() {
    return this.teacherRepo.find({
      join: {
        alias: 'teachers',
        leftJoinAndSelect: {
          lessons: 'teachers.lessons',
        },
      },
    });
  }
}
