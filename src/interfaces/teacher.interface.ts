import { Lesson } from './lesson.interface';

export interface Teacher {
  name: string;

  age: number;

  sex: string;

  yearsOfExperience: number;

  lessons: Lesson[];
}
