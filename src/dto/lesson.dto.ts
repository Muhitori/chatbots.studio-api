import { IsEnum } from 'class-validator';
import {
  DayOfTheWeek,
  Lesson,
  LessonTime,
  Subject,
} from '../interfaces/lesson.interface';
import { ClassroomDto } from './classroom.dto';
import { TeacherDto } from './teacher.dto';

export class LessonDto implements Lesson {
  @IsEnum(Subject) public subject: Subject;

  @IsEnum(DayOfTheWeek) public dayOfWeek: DayOfTheWeek;

  @IsEnum(LessonTime) public startTime: LessonTime;

  @IsEnum(ClassroomDto) public classroom: ClassroomDto;

  public teacher: TeacherDto;
}
