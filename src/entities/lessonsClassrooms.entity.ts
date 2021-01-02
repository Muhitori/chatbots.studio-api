import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
} from 'typeorm';

@Entity('LessonsClassrooms')
export class LessonClassroom {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('uuid')
  public lessonId: string;

  @Column('uuid')
  public classroomId: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  public deletedAt: Date;
}
