import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeacherLesson } from './teachersLessons.entity';

@Entity('Teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('int')
  public age: number;

  @Column('varchar')
  public sex: string;

  @Column('int')
  public yearsOfExperience: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date;

  @OneToMany(() => TeacherLesson, (teacherLesson) => teacherLesson.teacher)
  public teachersLessons: TeacherLesson[];
}
