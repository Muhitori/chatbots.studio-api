import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}