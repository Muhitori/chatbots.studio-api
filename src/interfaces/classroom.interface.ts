import { Lesson } from './lesson.interface';

export interface Classroom {
  number: number;

  lessons: Lesson[];
}
