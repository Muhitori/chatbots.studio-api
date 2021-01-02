import { Teacher } from './teacher.interface';
import { Classroom } from './classroom.interface';

export interface Lesson {
  subject: Subject;

  dayOfWeek: Day;

  startTime: LessonTimes;

  classrooms: Classroom[];
  teachers: Teacher[];
}

enum Subject {
  Biology = 'Biology',
  Math = 'Math',
  Physics = 'Physics',
  Chemistry = 'Chemistry',
}

enum Day {}

enum LessonTimes {}
