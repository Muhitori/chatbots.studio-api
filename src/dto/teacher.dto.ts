import { IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { Teacher, Gender } from '../interfaces/teacher.interface';
import { LessonDto } from './lesson.dto';

export class TeacherDto implements Teacher {
  @IsNotEmpty() public name: string;

  @IsNotEmpty() @IsNumber() @IsPositive() public age: number;

  @IsEnum(Gender) public gender: Gender;

  @IsNotEmpty() @IsNumber() @IsPositive() public yearsOfExperience: number;

  public lessons: LessonDto[];
}
