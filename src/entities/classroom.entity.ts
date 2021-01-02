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

@Entity('Classrooms')
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('int')
  public number: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date;

  @ManyToOne(() => Lesson, (lesson) => lesson.classroom)
  public lessons: Lesson[];
}
