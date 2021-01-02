import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LessonClassroom } from './lessonsClassrooms.entity';
import { TeacherLesson } from './teachersLessons.entity';

@Entity('Lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public subject: string;

  @Column('varchar')
  public dayOfWeek: string;

  @Column('varchar')
  public startTime: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date;

  @OneToMany(() => TeacherLesson, (teacherLesson) => teacherLesson.lesson)
  public teachersLessons: TeacherLesson[];

  @OneToMany(() => LessonClassroom, (lessonClassroom) => lessonClassroom.lesson)
  public lessonsClassrooms: LessonClassroom[];
}
