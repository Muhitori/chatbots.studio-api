import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Lessons')
export class Teacher {
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
}
