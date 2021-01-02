import { Lesson } from './lesson.interface';

export class Teacher {
  public name: string;

  public age: number;

  public sex: string;

  public yearsOfExperience: number;

  public lessons: Lesson[]
}