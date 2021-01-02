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
