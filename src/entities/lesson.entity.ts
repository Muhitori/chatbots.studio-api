import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Classroom } from './classroom.entity';
import { Teacher } from './teacher.entity';
import { DayOfTheWeek, LessonTime, Subject } from '../interfaces/lesson.dto';

@Entity('Lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('enum', { enum: Subject })
  public subject: Subject;

  @Column('enum', { enum: DayOfTheWeek })
  public dayOfWeek: DayOfTheWeek;

  @Column('enum', { enum: LessonTime })
  public startTime: LessonTime;

  @Column('uuid')
  public teacherId: string;

  @Column('uuid')
  public classroomId: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.lessons)
  public teacher: Teacher;

  @ManyToOne(() => Classroom, (classroom) => classroom.lessons)
  public classroom: Classroom;
}
