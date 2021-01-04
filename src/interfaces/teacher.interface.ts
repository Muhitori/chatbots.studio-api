import { Lesson } from './lesson.interface';

export interface Teacher {
  name: string;

  age: number;

  gender: Gender;

  yearsOfExperience: number;

  lessons: Lesson[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
