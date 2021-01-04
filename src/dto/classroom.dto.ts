import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Classroom } from '../interfaces/classroom.interface';
import { LessonDto } from './lesson.dto';

export class ClassroomDto implements Classroom {
  @IsNotEmpty() @IsNumber() @IsPositive() public number: number;

  public lessons: LessonDto[];
}
