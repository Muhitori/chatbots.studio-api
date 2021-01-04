import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import {
  DayOfTheWeek,
  LessonTime,
  Subject,
} from '../interfaces/lesson.interface';
import { Classroom } from '../entities/classroom.entity';
import { Teacher } from '../entities/teacher.entity';

export class LessonMigration20210104235630 implements MigrationInterface {
  private tableName = 'Lessons';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'subject',
            type: 'enum',
            enum: Object.values(Subject),
            isNullable: false,
          },
          {
            name: 'dayOfWeek',
            type: 'enum',
            enum: Object.values(DayOfTheWeek),
            isNullable: false,
          },
          {
            name: 'startTime',
            type: 'enum',
            enum: Object.values(LessonTime),
            isNullable: false,
          },
          {
            name: 'teacherId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'classroomId',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: true,
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['teacherId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Teachers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['classroomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Classrooms',
        onDelete: 'CASCADE',
      }),
    );

    const [
      teacher,
    ]: Teacher[] = await queryRunner.query(
      'SELECT * FROM "Teachers" WHERE name = $1',
      ['teacher'],
    );

    const [
      classroom,
    ]: Classroom[] = await queryRunner.query(
      'SELECT * FROM "Classrooms" WHERE number = $1',
      [100],
    );

    await queryRunner.query(
      'INSERT INTO "Lessons"("subject", "dayOfWeek", "startTime", "teacherId", "classroomId") VALUES ($1, $2, $3, $4, $5);',
      ['math', 'thursday', '10:30', teacher.id, classroom.id],
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
