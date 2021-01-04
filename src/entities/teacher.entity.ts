import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gender } from '../interfaces/teacher.interface';
import { Lesson } from './lesson.entity';

@Entity('Teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @Column('int')
  public age: number;

  @Column('enum', { enum: Gender })
  public gender: Gender;

  @Column('int')
  public yearsOfExperience: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date;

  @OneToMany(() => Lesson, (lesson) => lesson.teacher)
  public lessons: Lesson[];
}
