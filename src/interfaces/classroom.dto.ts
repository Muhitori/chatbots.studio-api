import { LessonDto } from './lesson.dto';

export interface ClassroomDto {
  number: number;

  lessons: LessonDto[];
}
