import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';
import { Teacher } from './teacher.entity';

@Entity('TeachersLessons')
export class TeacherLesson {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('uuid')
  public teacherId: string;

  @Column('uuid')
  public lessonId: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.teachersLessons)
  public teacher: Teacher;

  @ManyToOne(() => Lesson, (lesson) => lesson.teachersLessons)
  public lesson: Lesson;
}
