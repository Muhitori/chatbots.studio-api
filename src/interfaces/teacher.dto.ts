import { LessonDto } from './lesson.dto';

export interface TeacherDto {
  name: string;

  age: number;

  gender: Gender;

  yearsOfExperience: number;

  lessons: LessonDto[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}
