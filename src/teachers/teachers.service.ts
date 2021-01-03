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

  async getAll(): Promise<TeacherDto[] | []> {
    const dbTeachers = await this.teacherRepo.find({
      join: {
        alias: 'teachers',
        leftJoinAndSelect: {
          lessons: 'teachers.lessons',
        },
      },
    });

    const teachers: TeacherDto[] = this.clearTeachers(dbTeachers);

    return teachers;
  }

  async getBy(criteria: Partial<TeacherDto>): Promise<TeacherDto | null> {
    return this.teacherRepo.findOne({ where: criteria });
  }

  async getById(id: string): Promise<TeacherDto | null> {
    return this.teacherRepo.findOne(id);
  }

  async create(teacher: TeacherDto): Promise<TeacherDto | null> {
    const insertResult = await this.teacherRepo.insert(teacher);

    return this.teacherRepo.findOneOrFail({ where: insertResult.identifiers });
  }

  async update(id: string, teacher: TeacherDto): Promise<TeacherDto | null> {
    await this.teacherRepo.update(id, teacher);
    return this.getById(id);
  }

  async delete(id: string): Promise<any> {
    return this.teacherRepo.softDelete(id);
  }

  clearTeachers(teachers: TeacherDto[]) {
    const clearTeachers: TeacherDto[] = teachers.map((teacher) => {
      const newTeacher: TeacherDto = this.clearObj(teacher);

      if (newTeacher.lessons.length > 0) {
        newTeacher.lessons.map((lesson) => {
          return this.clearObj(lesson);
        });
      }

      return newTeacher;
    });
    return clearTeachers;
  }

  clearObj(obj: any): any {
    delete obj.id;
    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.deletedAt;
    if (obj.teacherId) {
      delete obj.teacherId;
    }
    if (obj.classroomId) {
      delete obj.classroomId;
    }
    return obj;
  }
}
