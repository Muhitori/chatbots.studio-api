import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { TeacherDto } from '../dto/teacher.dto';
import { Teacher } from '../entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepo: Repository<Teacher>,
  ) {}

  /* Lower than 14:35 because we need lessons between 8:30 and 14:30,
  14:35 is the closest value in schedule */
  async getTargetMathTeachers() {
    return this.clearTeachers(
      await getConnection().query(
        `SELECT * FROM "Teachers" AS teacher
        LEFT JOIN "Lessons" as lesson 
          ON teacher.id = lesson."teacherId"
        LEFT JOIN "Classrooms" AS classroom 
          ON lesson."classroomId" = classroom.id
        WHERE teacher."yearsOfExperience" > 10 
        AND teacher."deletedAt" IS NULL
        AND lesson."dayOfWeek" = 'thursday'
        AND lesson."startTime" < '14:35'
        AND classroom.number = 100 `,
      ),
    );
  }

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

  async getBy(criteria: Partial<TeacherDto>): Promise<TeacherDto[] | []> {
    return this.clearTeachers(
      await this.teacherRepo.find({
        where: criteria,
        join: {
          alias: 'teachers',
          leftJoinAndSelect: {
            lessons: 'teachers.lessons',
          },
        },
      }),
    );
  }

  async getById(id: string): Promise<TeacherDto | null> {
    return this.teacherRepo.findOne({
      where: id,
      join: {
        alias: 'teachers',
        leftJoinAndSelect: {
          lessons: 'teachers.lessons',
        },
      },
    });
  }

  async create(teacher: TeacherDto): Promise<TeacherDto | null> {
    console.log(teacher);
    const insertResult = await this.teacherRepo.insert(teacher);

    return this.clearTeacher(
      await this.teacherRepo.findOneOrFail({ where: insertResult.identifiers }),
    );
  }

  async update(id: string, teacher: TeacherDto): Promise<TeacherDto | null> {
    await this.teacherRepo.update(id, teacher);
    return this.clearTeacher(await this.getById(id));
  }

  async delete(id: string): Promise<any> {
    return this.teacherRepo.softDelete(id);
  }

  // Methods to clear Teacher & teacher nested objects from values that does not contains semantic sense
  clearTeachers(teachers: TeacherDto[]) {
    const clearTeachers: TeacherDto[] = teachers.map((teacher) => {
      return this.clearTeacher(teacher);
    });
    return clearTeachers;
  }

  clearTeacher(teacher: TeacherDto) {
    const newTeacher: TeacherDto = this.clearObj(teacher);

    if (newTeacher.lessons?.length > 0) {
      newTeacher.lessons.map((lesson) => {
        return this.clearObj(lesson);
      });
    }

    return newTeacher;
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
