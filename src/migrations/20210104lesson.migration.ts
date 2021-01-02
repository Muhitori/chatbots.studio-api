import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
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
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'dayOfWeek',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'startTime',
            type: 'varchar',
            length: '255',
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
      ['Math', 'Thursday', '10:30', teacher.id, classroom.id],
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
