import { Teacher } from './teacher.interface';
import { Classroom } from './classroom.interface';

export interface Lesson {
  subject: Subject;

  dayOfWeek: DayOfTheWeek;

  startTime: LessonTime;

  classroom: Classroom;
  teacher: Teacher;
}

export enum Subject {
  Biology = 'biology',
  Math = 'math',
  Physics = 'physics',
  Chemistry = 'chemistry',
}

export enum DayOfTheWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

// Lesson length 40 mins))
export enum LessonTime {
  First = '8:00',
  Second = '8:45',
  Third = '9:35',
  Fourth = '10:30',
  Fifth = '11:15',
  Sixth = '12:00',
  Seventh = '13:00',
  Eighth = '13:45',
  Ninth = '14:35',
  Tenth = '15:30',
  Eleventh = '16:15',
  Twelfth = '17:00',
}
