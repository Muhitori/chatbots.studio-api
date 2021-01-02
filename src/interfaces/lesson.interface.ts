import { Teacher } from './teacher.interface';
import { Classroom } from './classroom.interface';

export class Lesson {
  public subject: string;

  public dayOfWeek: string;

  public startTime: string;

  public classrooms: Classroom[];
  public teachers: Teacher[];
}
